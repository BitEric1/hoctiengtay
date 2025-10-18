const express = require("express");
const router = express.Router();
const { resend } = require("../configs/resend");
const { env } = require("../configs/env");
const { pool } = require("../configs/db.contact");

// ===== Helpers =====
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || "");
const escapeHtml = (s = "") =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
const limit = (s = "", n = 2000) => String(s).slice(0, n);
const stripCRLF = (s = "") => String(s).replace(/[\r\n]+/g, " "); // chống header injection

router.post("/", async (req, res) => {
    try {
        const raw = req.body || {};

        // Chuẩn hóa + giới hạn độ dài
        const name = limit((raw.name || "").trim(), 100);
        const phone = limit((raw.phone || "").trim(), 30);
        const email = limit((raw.email || "").trim(), 191);
        const message = limit((raw.message || "").trim(), 2000);
        const website = raw.website; // honeypot

        // Honeypot: bot điền -> coi như thành công nhưng bỏ qua
        if (website) return res.json({ ok: true });

        if (!name || !email || !message || !isEmail(email)) {
            return res
                .status(400)
                .json({ ok: false, error: "Dữ liệu không hợp lệ" });
        }

        // Lưu MySQL nếu có cấu hình; DB lỗi -> bỏ qua, vẫn gửi mail
        let contactId = null;
        if (pool) {
            try {
                await pool.execute(
                    `CREATE TABLE IF NOT EXISTS contacts(
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(30),
            email VARCHAR(191) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
                );

                const [ins] = await pool.execute(
                    `INSERT INTO contacts(name, phone, email, message) VALUES (?,?,?,?)`,
                    [name, phone || null, email, message]
                );
                contactId = ins.insertId || null;
            } catch (dbErr) {
                console.warn(
                    "⚠️ MySQL không khả dụng, bỏ qua lưu:",
                    dbErr.code || dbErr.message
                );
            }
        }

        // Escape để dựng HTML email an toàn
        const sName = escapeHtml(name);
        const sPhone = escapeHtml(phone || "-");
        const sEmail = escapeHtml(email);
        const sMsg = escapeHtml(message).replace(/\r?\n/g, "<br/>");
        const subj = `📩 Liên hệ mới từ ${stripCRLF(name)}`; // subject không CR/LF

        // Gửi mail cho admin
        await resend.emails.send({
            from: env.MAIL_FROM, // onboarding@resend.dev hoặc contact@domain
            to: env.MAIL_TO,
            reply_to: email,
            subject: subj,
            html: `
        <h3>Liên hệ mới</h3>
        <p><b>Họ tên:</b> ${sName}</p>
        <p><b>Điện thoại:</b> ${sPhone}</p>
        <p><b>Email:</b> ${sEmail}</p>
        <p><b>Nội dung:</b><br/>${sMsg}</p>
        ${contactId ? `<p><small>ID: ${contactId}</small></p>` : ""}
      `,
            text: `Liên hệ mới
Họ tên: ${name}
Điện thoại: ${phone || "-"}
Email: ${email}
Nội dung:
${message}
${contactId ? `ID: ${contactId}` : ""}`,
        });

        // Auto-reply cho người gửi
        await resend.emails.send({
            from: env.MAIL_FROM,
            to: email,
            subject: "Đã nhận liên hệ của bạn",
            html: `<p>Xin chào ${sName}, chúng tôi đã nhận liên hệ và sẽ phản hồi sớm.</p>`,
            text: `Xin chào ${name}, chúng tôi đã nhận liên hệ và sẽ phản hồi sớm.`,
        });

        return res.json({ ok: true });
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ ok: false, error: "Không gửi được, thử lại sau." });
    }
});

module.exports = router;
