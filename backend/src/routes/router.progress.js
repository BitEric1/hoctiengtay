const { Router } = require("express");
const { pool } = require("../database/db.courses");
const router = Router();

/**
 * POST /api/v1/courses/lessons/:slug/progress
 * body: { userId, percent }  // percent 0..100
 */
router.post("/courses/lessons/:slug/progress", async (req, res) => {
    const { slug } = req.params;
    const userId = Number(req.body.userId || 0) || 1;
    const percent = Math.max(0, Math.min(100, Number(req.body.percent || 0)));

    try {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // 1) Tìm lesson
            const [[lesson]] = await conn.query(
                "SELECT id FROM lessons WHERE slug = ? LIMIT 1",
                [slug.startsWith("/") ? slug : `/${slug}`]
            );
            if (!lesson) {
                await conn.rollback();
                return res.status(404).json({ error: "Lesson not found" });
            }

            // 2) Lấy tiến trình cũ để biết có "vượt 100 lần đầu tiên" hay chưa
            const [[oldProg]] = await conn.query(
                "SELECT percent, completed_at FROM user_lesson_progress WHERE user_id=? AND lesson_id=?",
                [userId, lesson.id]
            );

            const now = new Date();
            const justCompleted =
                percent >= 100 &&
                (!oldProg || (oldProg && oldProg.percent < 100));

            // 3) Upsert tiến trình
            await conn.query(
                `
        INSERT INTO user_lesson_progress (user_id, lesson_id, percent, first_started_at, last_activity_at, completed_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          percent = VALUES(percent),
          last_activity_at = VALUES(last_activity_at),
          completed_at = CASE
             WHEN VALUES(percent) >= 100 THEN VALUES(completed_at)
             ELSE completed_at
          END
        `,
                [
                    userId,
                    lesson.id,
                    percent,
                    oldProg ? oldProg.first_started_at : now,
                    now,
                    percent >= 100 ? now : null,
                ]
            );

            // 4) Nếu vừa hoàn thành lần đầu → cập nhật daily goal + streak
            if (justCompleted) {
                // timezone: lấy từ user_settings (fallback Asia/Ho_Chi_Minh)
                const [[settings]] = await conn.query(
                    "SELECT daily_goal, timezone, current_streak, longest_streak, last_active_date FROM user_settings WHERE user_id=?",
                    [userId]
                );
                const tz = settings?.timezone || "Asia/Ho_Chi_Minh";

                // ngày hôm nay theo timezone (tạm lấy theo server; nếu cần đúng TZ, lưu UTC date và xử lý TZ ở FE)
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const dd = String(today.getDate()).padStart(2, "0");
                const todayStr = `${yyyy}-${mm}-${dd}`;

                // tăng lessons_done
                await conn.query(
                    `
          INSERT INTO user_daily_stats (user_id, stat_date, lessons_done)
          VALUES (?, ?, 1)
          ON DUPLICATE KEY UPDATE lessons_done = lessons_done + 1
          `,
                    [userId, todayStr]
                );

                // cập nhật streak
                let cur = settings?.current_streak || 0;
                let best = settings?.longest_streak || 0;
                const last = settings?.last_active_date; // dạng DATE

                const lastDate = last ? new Date(last) : null;
                const diffDays = lastDate
                    ? Math.floor((today - lastDate) / (24 * 3600 * 1000))
                    : null;

                if (lastDate === null) {
                    cur = 1;
                    best = Math.max(best, cur);
                } else if (diffDays === 0) {
                    // đã có hoạt động hôm nay, không đổi streak
                } else if (diffDays === 1) {
                    cur += 1;
                    best = Math.max(best, cur);
                } else if (diffDays > 1) {
                    cur = 1; // reset streak
                    best = Math.max(best, cur);
                }

                await conn.query(
                    `
          INSERT INTO user_settings (user_id, daily_goal, timezone, current_streak, longest_streak, last_active_date)
          VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            current_streak = ?,
            longest_streak = ?,
            last_active_date = ?
          `,
                    [
                        userId,
                        settings?.daily_goal || 5,
                        tz,
                        cur,
                        best,
                        todayStr,
                        cur,
                        best,
                        todayStr,
                    ]
                );
            }

            await conn.commit();
            res.json({ ok: true, percent, justCompleted });
        } catch (e) {
            await conn.rollback();
            throw e;
        } finally {
            conn.release();
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = router;
