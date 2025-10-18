const { Router } = require("express");
const { pool } = require("../database/db.courses"); // giữ nguyên đường dẫn tới pool của bạn
const r = Router();

/**
 * GET /api/v1/pronounce/session?userId=1&date=YYYY-MM-DD
 * Trả về { idx, passed } nếu có; nếu chưa có trả { idx:0, passed:0 }
 */
r.get("/pronounce/session", async (req, res) => {
    try {
        const userId = Number(req.query.userId);
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        const date = req.query.date || new Date().toISOString().slice(0, 10);

        const [rows] = await pool.query(
            "SELECT idx, passed FROM user_pronounce_sessions WHERE user_id=? AND stat_date=? LIMIT 1",
            [userId, date]
        );

        if (!rows.length) return res.json({ idx: 0, passed: 0 });
        return res.json(rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

/**
 * PUT /api/v1/pronounce/session
 * Body: { userId, date?: 'YYYY-MM-DD', idx, passed }
 * Upsert phiên trong ngày
 */
r.put("/pronounce/session", async (req, res) => {
    try {
        const { userId, idx = 0, passed = 0 } = req.body || {};
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        const date = req.body.date || new Date().toISOString().slice(0, 10);

        await pool.query(
            `INSERT INTO user_pronounce_sessions (user_id, stat_date, idx, passed)
       VALUES (?,?,?,?)
       ON DUPLICATE KEY UPDATE
         idx=VALUES(idx),
         passed=VALUES(passed),
         updated_at=NOW()`,
            [userId, date, idx, passed]
        );

        res.json({ ok: 1, userId, date, idx, passed });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = r;
