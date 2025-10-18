const { Router } = require("express");
const { pool } = require("../database/db.courses");
const r = Router();

r.get("/users/:userId/daily", async (req, res) => {
    const userId = Number(req.params.userId);
    try {
        const [[settings]] = await pool.query(
            "SELECT daily_goal, current_streak, longest_streak, last_active_date FROM user_settings WHERE user_id=?",
            [userId]
        );
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const [[stat]] = await pool.query(
            "SELECT lessons_done FROM user_daily_stats WHERE user_id=? AND stat_date=?",
            [userId, todayStr]
        );

        const target = settings?.daily_goal || 5;
        const doneToday = stat?.lessons_done || 0;
        const percent = Math.min(100, Math.round((doneToday / target) * 100));

        res.json({
            target,
            doneToday,
            percent,
            streakCurrent: settings?.current_streak || 0,
            streakBest: settings?.longest_streak || 0,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = r;
