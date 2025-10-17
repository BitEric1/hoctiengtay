const { Router } = require("express");
const { pool } = require("../database/db.courses");

const r = Router();

/** GET /api/v1/courses/chapters?userId=1
 *  Trả về: [{ id, title, lessons: [{ id, title, slug, locked, progress }] }]
 */
r.get("/courses/chapters", async (req, res) => {
    const userId = Number(req.query.userId || 0); // chưa login thì 0

    const sql = `
    WITH lp AS (
      SELECT l.id AS lesson_id,
             ROUND(100 * SUM(CASE WHEN u.is_done=1 THEN 1 ELSE 0 END) / NULLIF(COUNT(e.id),0)) AS pct
      FROM lessons l
      JOIN exercise_sets s ON s.lesson_id = l.id
      JOIN exercises e ON e.set_id = s.id
      LEFT JOIN user_exercise_progress u
             ON u.exercise_id = e.id AND u.user_id = ?
      GROUP BY l.id
    )
    SELECT
      c.id   AS chapter_id, c.code AS chapter_code, c.title AS chapter_title, c.sort_order AS c_order,
      l.id   AS lesson_id,  l.code AS lesson_code,  l.title AS lesson_title,  l.slug,
      l.is_published, l.publish_at, l.is_locked_default, l.sort_order AS l_order,
      COALESCE(lp.pct,0) AS percent_done
    FROM chapters c
    JOIN lessons l ON l.chapter_id = c.id
    LEFT JOIN lp ON lp.lesson_id = l.id
    ORDER BY c_order, l_order;
  `;
    const [rows] = await pool.query(sql, [userId]);

    // nhóm theo chapter
    const map = new Map();
    for (const r of rows) {
        if (!map.has(r.chapter_id)) {
            map.set(r.chapter_id, {
                id: r.chapter_code,
                title: r.chapter_title,
                lessons: [],
            });
        }
        const locked =
            r.is_published === 0 ||
            (r.publish_at && new Date(r.publish_at) > new Date()) ||
            r.is_locked_default === 1;

        map.get(r.chapter_id).lessons.push({
            id: r.lesson_code,
            title: r.lesson_title,
            slug: r.slug,
            locked,
            progress: Number(r.percent_done || 0),
        });
    }
    res.json([...map.values()]);
});

/** GET /api/v1/courses/lessons/:slug?hideCorrect=1
 *  Trả về đúng cấu trúc FE đang dùng: { id, title, slug, questions:[ {id:1, types:[...], questions:[...]}, ...] }
 *  Chú ý: audio/img giữ token như DB; FE sẽ map token → đường dẫn /public (phần FE bên dưới).
 */
r.get("/courses/lessons/:slug", async (req, res) => {
    const { slug } = req.params;
    const hideCorrect = String(req.query.hideCorrect || "0") === "1";

    // lấy meta lesson
    const [lessonRows] = await pool.query(
        "SELECT id, code, title, slug FROM lessons WHERE slug=? LIMIT 1",
        [slug]
    );
    if (!lessonRows.length)
        return res.status(404).json({ error: "Lesson not found" });
    const lesson = lessonRows[0];

    // lấy items cả 2 set
    const sqlItems = `
    SELECT s.id AS set_id, s.kind, s.sort_order AS set_order,
           e.id AS exercise_id, e.sort_order,
           v.img_url, v.audio_url, v.mat_chu, v.nghia_tv,
           f.first_text, f.last_text, f.audio_url AS fb_audio
    FROM exercise_sets s
    JOIN lessons l ON l.id = s.lesson_id
    JOIN exercises e ON e.set_id = s.id
    LEFT JOIN exercise_vocab v ON v.exercise_id = e.id
    LEFT JOIN exercise_fill_blank f ON f.exercise_id = e.id
    WHERE l.slug = ?
    ORDER BY set_order, e.sort_order;
  `;
    const [items] = await pool.query(sqlItems, [slug]);

    // options cho fill_blank
    const sqlOpts = `
    SELECT e.id AS exercise_id, o.option_text, o.is_correct, o.sort_order
    FROM exercise_sets s
    JOIN lessons l ON l.id=s.lesson_id
    JOIN exercises e ON e.set_id=s.id
    JOIN exercise_options o ON o.exercise_id=e.id
    WHERE l.slug=? AND s.kind='fill_blank'
    ORDER BY e.sort_order, o.sort_order;
  `;
    const [opts] = await pool.query(sqlOpts, [slug]);
    const optMap = opts.reduce((acc, o) => {
        (acc[o.exercise_id] = acc[o.exercise_id] || []).push(o);
        return acc;
    }, {});

    // build 2 group như FE
    const groupVocab = {
        id: 1,
        types: [
            "Card",
            "ChoiceQuestion",
            "ChoiceAudio",
            "MatchQuestion",
            "WriteAnswer",
        ],
        questions: [],
    };
    const groupFB = { id: 2, types: ["FillInTheBlank"], questions: [] };

    for (const it of items) {
        if (it.kind === "vocab") {
            groupVocab.questions.push({
                id: it.exercise_id,
                img: it.img_url || null,
                audio: it.audio_url || null,
                matChu: it.mat_chu,
                nghiaTV: it.nghia_tv,
            });
        } else if (it.kind === "fill_blank") {
            const options = (optMap[it.exercise_id] || []).sort(
                (a, b) => a.sort_order - b.sort_order
            );
            const answer = options.map((o) => o.option_text);
            const correct =
                options.find((o) => o.is_correct === 1)?.option_text || null;
            groupFB.questions.push({
                id: it.exercise_id,
                first: it.first_text,
                last: it.last_text,
                audio: it.fb_audio || null,
                answer,
                ...(hideCorrect ? {} : { correct }),
            });
        }
    }

    res.json({
        id: lesson.code,
        title: lesson.title,
        slug: lesson.slug,
        questions: [
            ...(groupVocab.questions.length ? [groupVocab] : []),
            ...(groupFB.questions.length ? [groupFB] : []),
        ],
    });
});

module.exports = r;
