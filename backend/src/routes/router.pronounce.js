const { Router } = require("express");
const { pool } = require("../database/db.courses");

const r = Router();

/**
 * GET /api/v1/pronounce/daily?userId=1&limit=10
 * Gợi ý các bài luyện phát âm cho hôm nay, độc lập với trang lesson.
 * Trả về { target, items: [{ id, text, audio, tip, last_score, last_time }] }
 */
r.get("/pronounce/daily", async (req, res) => {
    try {
        const userId = Number(req.query.userId || 0) || 1;
        const limit = Math.min(Number(req.query.limit || 10), 30);

        // Lấy daily_goal (nếu có)
        const [setRows] = await pool.query(
            "SELECT daily_goal FROM user_settings WHERE user_id=? LIMIT 1",
            [userId]
        );
        const target = setRows[0]?.daily_goal ?? 5;

        const sql = `
      SELECT p.exercise_id AS id,
             p.target_text  AS text,
             p.audio_url    AS audio,
             p.tip,
             ua.last_score,
             ua.last_time
      FROM exercise_pronounce p
      JOIN exercises e      ON e.id = p.exercise_id
      JOIN exercise_sets s  ON s.id = e.set_id
      JOIN lessons l        ON l.id = s.lesson_id AND l.is_published=1
      LEFT JOIN (
        SELECT a.exercise_id,
               MAX(a.created_at) AS last_time,
               SUBSTRING_INDEX(GROUP_CONCAT(a.score ORDER BY a.created_at DESC), ',', 1) AS last_score
        FROM user_pron_attempts a
        WHERE a.user_id=?
        GROUP BY a.exercise_id
      ) ua ON ua.exercise_id = p.exercise_id
      ORDER BY (ua.last_score IS NULL) DESC, ua.last_score ASC, ua.last_time ASC
      LIMIT ?;
    `;
        const [rows] = await pool.query(sql, [userId, limit]);

        res.json({ target, items: rows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

/**
 * POST /api/v1/pronounce/attempt
 * Body: { userId, exerciseId, recognizedText, score, durationMs }
 */
r.post("/pronounce/attempt", async (req, res) => {
    try {
        const {
            userId,
            exerciseId,
            recognizedText = "",
            score = 0,
            durationMs = null,
        } = req.body || {};
        if (!userId || !exerciseId)
            return res.status(400).json({ error: "Missing userId/exerciseId" });

        await pool.query(
            `INSERT INTO user_pron_attempts (user_id, exercise_id, recognized_text, score, duration_ms)
       VALUES (?,?,?,?,?)`,
            [
                userId,
                exerciseId,
                recognizedText,
                Math.max(0, Math.min(100, score | 0)),
                durationMs,
            ]
        );

        res.json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = r;
