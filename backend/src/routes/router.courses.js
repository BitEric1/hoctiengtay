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
    const userId = Number(req.query.userId || 0) || 1;

    try {
        // 1) Lấy chapter + lesson (đã publish), kèm progress người dùng
        const [rows] = await pool.query(
            `
      SELECT
        c.id            AS chapter_id,
        c.title         AS chapter_title,
        c.sort_order    AS chapter_order,
        l.id            AS lesson_id,
        l.title         AS lesson_title,
        l.slug          AS lesson_slug,
        l.sort_order    AS lesson_order,
        l.is_published,
        l.is_locked_default,
        COALESCE(p.percent, 0) AS progress
      FROM chapters c
      JOIN lessons  l ON l.chapter_id = c.id
      LEFT JOIN user_lesson_progress p
             ON p.user_id = ? AND p.lesson_id = l.id
      WHERE l.is_published = 1
      ORDER BY c.sort_order, l.sort_order
      `,
            [userId]
        );

        // 2) Gom nhóm theo chapter, tính locked/done theo thứ tự
        const chaptersMap = new Map();
        for (const r of rows) {
            if (!chaptersMap.has(r.chapter_id)) {
                chaptersMap.set(r.chapter_id, {
                    id: r.chapter_id,
                    title: r.chapter_title,
                    lessons: [],
                });
            }
            chaptersMap.get(r.chapter_id).lessons.push({
                id: r.lesson_id,
                title: r.lesson_title,
                slug: r.lesson_slug.replace(/^\//, ""), // FE dùng /learn/[slug]
                order: r.lesson_order,
                is_published: r.is_published === 1,
                is_locked_default: r.is_locked_default === 1,
                progress: r.progress,
                done: r.progress >= 100,
                locked: true, // tạm, lát tính
            });
        }

        // 3) Tính locked theo thứ tự trong từng chương
        for (const chapter of chaptersMap.values()) {
            // sort đề phòng
            chapter.lessons.sort((a, b) => a.order - b.order);

            let prevDone = false;
            chapter.lessons.forEach((lesson, idx) => {
                if (!lesson.is_published) {
                    lesson.locked = true;
                } else if (idx === 0) {
                    lesson.locked = lesson.is_locked_default; // bài đầu
                } else {
                    lesson.locked = !prevDone; // mở nếu bài trước đã done
                }
                prevDone = lesson.done;
            });

            // (tùy chọn) % tiến độ chương
            const total = chapter.lessons.length || 1;
            const doneCount = chapter.lessons.filter((x) => x.done).length;
            chapter.progress = Math.round((doneCount / total) * 100);
        }

        res.json(Array.from(chaptersMap.values()));
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
