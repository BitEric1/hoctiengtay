const { Router } = require("express");
const { pool } = require("../database/db.courses");
const r = Router();

/** HEALTH */
r.get("/health", (_req, res) => res.json({ ok: true }));

/** ===== A) CHAPTER LIST (nhẹ) =====
 * GET /api/v1/courses/chapters?userId=1
 * Trả: [{id,title,lessons:[{id,title,slug,locked,progress}]}]
 */
r.get("/chapters", async (req, res) => {
    try {
        const userId = Number(req.query.userId || 0);

        const sql = `
      SELECT
        c.id  AS c_id,  c.code AS c_code,  c.title AS c_title,  c.sort_order AS c_sort,
        l.id  AS l_id,  l.code AS l_code,  l.title AS l_title,  l.slug, l.sort_order AS l_sort,
        l.is_published, l.publish_at, l.is_locked_default,
        COALESCE(t_all.cnt_all,0)  AS cnt_all,
        COALESCE(t_done.cnt_done,0) AS cnt_done
      FROM chapters c
      JOIN lessons  l ON l.chapter_id = c.id
      /* tổng exercise mỗi bài */
      LEFT JOIN (
        SELECT l.id AS lesson_id, COUNT(e.id) AS cnt_all
        FROM lessons l
        JOIN exercise_sets s ON s.lesson_id = l.id
        JOIN exercises     e ON e.set_id     = s.id
        GROUP BY l.id
      ) t_all   ON t_all.lesson_id = l.id
      /* số bài đã hoàn thành theo user */
      LEFT JOIN (
        SELECT l.id AS lesson_id, SUM(CASE WHEN u.is_done=1 THEN 1 ELSE 0 END) AS cnt_done
        FROM lessons l
        JOIN exercise_sets s ON s.lesson_id = l.id
        JOIN exercises     e ON e.set_id     = s.id
        LEFT JOIN user_exercise_progress u
               ON u.exercise_id = e.id AND u.user_id = ?
        GROUP BY l.id
      ) t_done  ON t_done.lesson_id = l.id
      ORDER BY c_sort, l_sort;
    `;
        const [rows] = await pool.query(sql, [userId]);

        const out = [];
        const by = new Map();
        for (const r of rows) {
            if (!by.has(r.c_id)) {
                const chap = { id: r.c_code, title: r.c_title, lessons: [] };
                by.set(r.c_id, chap);
                out.push(chap);
            }
            const percent = r.cnt_all
                ? Math.round((100 * r.cnt_done) / r.cnt_all)
                : 0;
            const locked =
                r.is_published === 0 ||
                (r.publish_at && new Date(r.publish_at) > new Date()) ||
                r.is_locked_default === 1;

            by.get(r.c_id).lessons.push({
                id: r.l_code,
                title: r.l_title,
                slug: r.slug,
                locked,
                progress: percent,
            });
        }

        res.json(out);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

/** ===== B) LESSON DETAIL =====
 * GET /api/v1/courses/lessons/:slug
 * Trả: {id,title,slug,questions:[{id,types,questions:[...]}]}
 * Lưu ý: :slug là 1 segment không có "/" đầu; trong DB slug lưu dạng "/chuong1-bai1"
 */
r.get("/lessons/:slug", async (req, res) => {
    try {
        // chuẩn hoá slug
        let slug = req.params.slug || "";
        try {
            slug = decodeURIComponent(slug);
        } catch {}
        if (!slug.startsWith("/")) slug = `/${slug}`;

        const [lessonRows] = await pool.query(
            "SELECT id, code, title, slug FROM lessons WHERE slug=? LIMIT 1",
            [slug]
        );
        if (!lessonRows.length) {
            return res
                .status(404)
                .json({ error: "Lesson not found", slugTried: slug });
        }
        const lesson = lessonRows[0];

        // items (vocab + fill_blank)
        const [items] = await pool.query(
            `
      SELECT s.kind, e.id ex_id, e.sort_order,
             v.img_url, v.audio_url, v.mat_chu, v.nghia_tv,
             f.first_text, f.last_text, f.audio_url AS fb_audio
      FROM exercise_sets s
      JOIN exercises e ON e.set_id=s.id
      LEFT JOIN exercise_vocab v ON v.exercise_id=e.id
      LEFT JOIN exercise_fill_blank f ON f.exercise_id=e.id
      WHERE s.lesson_id=? ORDER BY s.sort_order, e.sort_order
    `,
            [lesson.id]
        );

        // options cho fill_blank
        const [opts] = await pool.query(
            `
      SELECT e.id ex_id, o.option_text, o.is_correct, o.sort_order
      FROM exercise_sets s
      JOIN exercises e ON e.set_id=s.id
      JOIN exercise_options o ON o.exercise_id=e.id
      WHERE s.lesson_id=? AND s.kind='fill_blank'
      ORDER BY e.sort_order, o.sort_order
    `,
            [lesson.id]
        );

        const optMap = opts.reduce(
            (m, o) => ((m[o.ex_id] = m[o.ex_id] || []).push(o), m),
            {}
        );

        const group1 = {
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
        const group2 = { id: 2, types: ["FillInTheBlank"], questions: [] };

        for (const it of items) {
            if (it.kind === "vocab") {
                group1.questions.push({
                    id: it.ex_id,
                    img: it.img_url, // token "img.img1" (FE tự map)
                    audio: it.audio_url, // token "audio.so1"
                    matChu: it.mat_chu,
                    nghiaTV: it.nghia_tv,
                });
            } else {
                const os = (optMap[it.ex_id] || []).sort(
                    (a, b) => a.sort_order - b.sort_order
                );
                group2.questions.push({
                    id: it.ex_id,
                    first: it.first_text,
                    last: it.last_text,
                    audio: it.fb_audio, // token "audio.cau1"
                    answer: os.map((o) => o.option_text),
                    correct:
                        os.find((o) => o.is_correct === 1)?.option_text || null,
                });
            }
        }

        res.json({
            id: lesson.code,
            title: lesson.title,
            slug: lesson.slug,
            questions: [
                ...(group1.questions.length ? [group1] : []),
                ...(group2.questions.length ? [group2] : []),
            ],
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

/** ===== C) BIG payload (chỉ dùng test dev)
 * GET /api/v1/courses
 * Trả: { data: [ {id,title,lessons:[{id,title,slug,questions:[...]}]} ] }
 */
r.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT c.id c_id, c.code c_code, c.title c_title, c.sort_order c_sort,
             l.id l_id, l.code l_code, l.title l_title, l.slug, l.sort_order l_sort
      FROM chapters c
      JOIN lessons l ON l.chapter_id=c.id
      ORDER BY c_sort,l_sort
    `);

        const [items] = await pool.query(`
      SELECT l.slug, s.kind, e.id ex_id, e.sort_order,
             v.img_url, v.audio_url, v.mat_chu, v.nghia_tv,
             f.first_text, f.last_text, f.audio_url AS fb_audio
      FROM lessons l
      JOIN exercise_sets s ON s.lesson_id=l.id
      JOIN exercises e ON e.set_id=s.id
      LEFT JOIN exercise_vocab v ON v.exercise_id=e.id
      LEFT JOIN exercise_fill_blank f ON f.exercise_id=e.id
      ORDER BY l.slug, s.sort_order, e.sort_order
    `);

        const [opts] = await pool.query(`
      SELECT l.slug, e.id ex_id, o.option_text, o.is_correct, o.sort_order
      FROM lessons l
      JOIN exercise_sets s ON s.lesson_id=l.id AND s.kind='fill_blank'
      JOIN exercises e ON e.set_id=s.id
      JOIN exercise_options o ON o.exercise_id=e.id
      ORDER BY l.slug, e.sort_order, o.sort_order
    `);
        const optMap = opts.reduce(
            (m, o) => (
                (m[`${o.slug}:${o.ex_id}`] =
                    m[`${o.slug}:${o.ex_id}`] || []).push(o),
                m
            ),
            {}
        );

        // group per lesson
        const perLesson = {};
        for (const it of items) {
            const arr = (perLesson[it.slug] = perLesson[it.slug] || []);
            if (it.kind === "vocab") {
                let g = arr.find((x) => x.id === 1);
                if (!g)
                    arr.push(
                        (g = {
                            id: 1,
                            types: [
                                "Card",
                                "ChoiceQuestion",
                                "ChoiceAudio",
                                "MatchQuestion",
                                "WriteAnswer",
                            ],
                            questions: [],
                        })
                    );
                g.questions.push({
                    id: it.ex_id,
                    img: it.img_url,
                    audio: it.audio_url,
                    matChu: it.mat_chu,
                    nghiaTV: it.nghia_tv,
                });
            } else {
                let g = arr.find((x) => x.id === 2);
                if (!g)
                    arr.push(
                        (g = {
                            id: 2,
                            types: ["FillInTheBlank"],
                            questions: [],
                        })
                    );
                const os = (optMap[`${it.slug}:${it.ex_id}`] || []).sort(
                    (a, b) => a.sort_order - b.sort_order
                );
                g.questions.push({
                    id: it.ex_id,
                    first: it.first_text,
                    last: it.last_text,
                    audio: it.fb_audio,
                    answer: os.map((o) => o.option_text),
                    correct:
                        os.find((o) => o.is_correct === 1)?.option_text || null,
                });
            }
        }

        // bundle chapters
        const data = [];
        const byChap = new Map();
        for (const r of rows) {
            if (!byChap.has(r.c_id)) {
                const chap = { id: r.c_code, title: r.c_title, lessons: [] };
                byChap.set(r.c_id, chap);
                data.push(chap);
            }
            byChap.get(r.c_id).lessons.push({
                id: r.l_code,
                title: r.l_title,
                slug: r.slug,
                questions: perLesson[r.slug] || [],
            });
        }
        res.json({ data });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

module.exports = r;
