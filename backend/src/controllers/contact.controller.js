const { z } = require("zod");
const { resend } = require("../configs/resend.js");
const { env } = require("../configs/env");
const { pool } = require("../configs/db.contact.js");

const ContactSchema = z.object({
    name: z.string().min(2),
    phone: z.string().optional().nullable(),
    email: z.string().email(),
    message: z.string().min(2),
    website: z.string().optional().nullable(), // honeypot
});

async function postContact(req, res) {
    try {
        const parsed = ContactSchema.safeParse(req.body || {});
        if (!parsed.success) {
            return res
                .status(400)
                .json({ ok: false, error: parsed.error.issues[0].message });
        }
        const { name, phone, email, message, website } = parsed.data;

        // Bot điền honeypot -> coi như thành công nhưng bỏ qua
        if (website) return res.json({ ok: true });

        // Lưu MySQL (nếu có cấu hình)
        let contactId = null;
        if (pool) {
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
        }

        // Gửi cho admin
        await resend.emails.send({
            from: env.MAIL_FROM,
            to: env.MAIL_TO,
            reply_to: email,
            subject: `📩 Liên hệ mới từ ${name}`,
            html: `
        <h3>Liên hệ mới</h3>
        <p><b>Họ tên:</b> ${name}</p>
        <p><b>Điện thoại:</b> ${phone || "-"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Nội dung:</b><br>${String(message).replace(/\n/g, "<br/>")}</p>
        ${contactId ? `<p><small>ID: ${contactId}</small></p>` : ""}
      `,
        });

        // Auto-reply
        await resend.emails.send({
            from: env.MAIL_FROM,
            to: email,
            subject: "Đã nhận liên hệ của bạn",
            html: `<p>Xin chào ${name}, chúng tôi đã nhận liên hệ và sẽ phản hồi sớm.</p>`,
        });

        return res.json({ ok: true });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ ok: false, error: "Không gửi được, thử lại sau." });
    }
}

module.exports = { postContact };
