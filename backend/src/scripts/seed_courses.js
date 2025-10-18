/**
 * Seed "courses" from hard-coded JSON into MySQL/TiDB.
 * - Keeps media strings as-is (e.g. "audio.so1", "img.img1") for now.
 * - Creates:
 *   chapters → lessons → exercise_sets (vocab / fill_blank)
 *   → exercises → exercise_vocab / exercise_fill_blank (+ exercise_options)
 *
 * Run:  node backend/src/scripts/seed_courses.js
 */

const { pool } = require("../database/db.courses.js");
require("dotenv").config();

// ==== 1) PASTE your JSON here (or import from a file) ====
const DATA = [
    {
        id: "chuong-I",
        title: "Chương 1: Số đếm",
        lessons: [
            {
                id: "bai-1",
                title: "Số đếm từ 1 đến 10",
                slug: "/chuong1-bai1",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bai2",
                slug: "/chuong1-bai2",
                title: "Bài 2: Số đếm từ 10 đến 100",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bai3",
                slug: "/chuong1-bai3",
                title: "Bài 3: Số hàng trăm",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bai4",
                slug: "/chuong1-bai4",
                title: "Bài 4: Số hàng nghìn",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "chuong-II",
        title: "Chương 2: Số đếm",
        lessons: [
            {
                id: "bai1",
                title: "Số đếm từ 1 đến 10",
                slug: "/chuong2-bai1",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bai2",
                slug: "/chuong2-bai2",
                title: "Bài 2: Số đếm từ 10 đến 100",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bai3",
                title: "Bài 3: Số hàng trăm",
                slug: "/chuong2-bai3",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
            {
                id: "bai4",
                title: "Bài 4: Số hàng nghìn",
                slug: "/chuong2-bai4",
                questions: [
                    {
                        id: 1,
                        types: [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ],
                        questions: [
                            {
                                id: 1,
                                img: "img.img1",
                                audio: "audio.so1",
                                matChu: "Nâng",
                                nghiaTV: "Số 1",
                            },
                            {
                                id: 2,
                                img: "img.img2",
                                audio: "audio.so2",
                                matChu: "Sloong",
                                nghiaTV: "Số 2",
                            },
                            {
                                id: 3,
                                img: "img.img3",
                                audio: "audio.so3",
                                matChu: "Slam",
                                nghiaTV: "Số 3",
                            },
                            {
                                id: 4,
                                img: "img.img4",
                                audio: "audio.so4",
                                matChu: "Slí",
                                nghiaTV: "Số 4",
                            },
                            {
                                id: 5,
                                img: "img.img5",
                                audio: "audio.so5",
                                matChu: "Hả",
                                nghiaTV: "Số 5",
                            },
                        ],
                    },
                    {
                        id: 2,
                        types: ["FillInTheBlank"],
                        questions: [
                            {
                                id: 1,
                                first: "Lườn ché mì",
                                last: "cần",
                                answer: ["Hất", "Chất", "Slon", "Ché"],
                                audio: "audio.cau1",
                                correct: "Chất",
                            },
                            {
                                id: 2,
                                first: "Pả mì",
                                last: "ăn mác táo",
                                answer: ["Hả", "Thả", "Slon", "Slam"],
                                audio: "audio.cau2",
                                correct: "Hả",
                            },
                            {
                                id: 3,
                                first: "Lan pây tạy slư đảy",
                                last: "pi dá.",
                                answer: ["Slam", "Slí", "Sloong", "Hốc"],
                                audio: "audio.cau3",
                                correct: "Slam",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

// ---------- helpers ----------
async function upsertChapter(conn, chapter) {
    // chapters.code unique
    const [row] = await conn.query("SELECT id FROM chapters WHERE code=?", [
        chapter.id,
    ]);
    if (row.length) return row[0].id;

    const [res] = await conn.query(
        "INSERT INTO chapters(code, title, sort_order) VALUES (?,?,?)",
        [chapter.id, chapter.title || chapter.name || chapter.id, 999]
    );
    return res.insertId;
}

async function upsertLesson(conn, chapterId, lesson, idx) {
    // lessons.slug unique; (chapter_id, code) unique
    const code = String(lesson.id || `bai-${idx + 1}`);
    const slug = String(lesson.slug || `/${chapterId}-${code}`);

    const [row] = await conn.query("SELECT id FROM lessons WHERE slug=?", [
        slug,
    ]);
    if (row.length) return row[0].id;

    const [res] = await conn.query(
        `INSERT INTO lessons(chapter_id, code, slug, title, sort_order, is_published, is_locked_default)
     VALUES (?,?,?,?,?,?,?)`,
        [chapterId, code, slug, lesson.title || code, idx + 1, 1, 0]
    );
    return res.insertId;
}

async function createSet(conn, lessonId, kind, title, order, allowedTypes) {
    const [res] = await conn.query(
        `INSERT INTO exercise_sets(lesson_id, kind, title, sort_order, allowed_types, total_exercises)
     VALUES (?,?,?,?,JSON_ARRAY(?),0)`,
        [
            lessonId,
            kind,
            title,
            order,
            ...(allowedTypes && allowedTypes.length ? [allowedTypes] : [[]]),
        ]
    );
    return res.insertId;
}

async function createExercise(conn, setId, type, sortOrder) {
    const [res] = await conn.query(
        `INSERT INTO exercises(set_id, type, sort_order) VALUES (?,?,?)`,
        [setId, type, sortOrder]
    );
    return res.insertId;
}

async function createExerciseVocab(conn, exerciseId, item) {
    await conn.query(
        `INSERT INTO exercise_vocab(exercise_id, img_url, audio_url, mat_chu, nghia_tv)
     VALUES (?,?,?,?,?)`,
        [
            exerciseId,
            item.img || null,
            item.audio || null,
            item.matChu,
            item.nghiaTV,
        ]
    );
}

async function createExerciseFillBlank(conn, exerciseId, item) {
    await conn.query(
        `INSERT INTO exercise_fill_blank(exercise_id, first_text, last_text, audio_url)
     VALUES (?,?,?,?)`,
        [exerciseId, item.first, item.last, item.audio || null]
    );
    // options
    if (Array.isArray(item.answer)) {
        let i = 0;
        for (const opt of item.answer) {
            i++;
            await conn.query(
                `INSERT INTO exercise_options(exercise_id, option_text, is_correct, sort_order)
         VALUES (?,?,?,?)`,
                [exerciseId, opt, opt === item.correct ? 1 : 0, i]
            );
        }
    }
}

async function updateSetTotal(conn, setId) {
    await conn.query(
        `UPDATE exercise_sets s
       SET total_exercises = (SELECT COUNT(*) FROM exercises e WHERE e.set_id=s.id)
     WHERE s.id=?`,
        [setId]
    );
}

async function seed() {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        for (const [ci, chapter] of DATA.entries()) {
            const chapterId = await upsertChapter(conn, chapter);

            for (const [li, lesson] of (chapter.lessons || []).entries()) {
                const lessonId = await upsertLesson(
                    conn,
                    chapterId,
                    lesson,
                    li
                );

                // Mỗi lesson có mảng "questions" gồm 2 group:
                //  - group 1: vocab (Card/ChoiceQuestion/ChoiceAudio/MatchQuestion/WriteAnswer)
                //  - group 2: fill_blank (FillInTheBlank)
                const groups = Array.isArray(lesson.questions)
                    ? lesson.questions
                    : [];

                // --- Group 1: vocab ---
                const vocabGroup = groups.find(
                    (g) =>
                        Array.isArray(g.types) &&
                        g.types.some((t) =>
                            [
                                "Card",
                                "ChoiceQuestion",
                                "ChoiceAudio",
                                "MatchQuestion",
                                "WriteAnswer",
                            ].includes(t)
                        )
                );
                if (
                    vocabGroup &&
                    Array.isArray(vocabGroup.questions) &&
                    vocabGroup.questions.length
                ) {
                    const vocabSetId = await createSet(
                        conn,
                        lessonId,
                        "vocab",
                        "Từ vựng",
                        1,
                        [
                            "Card",
                            "ChoiceQuestion",
                            "ChoiceAudio",
                            "MatchQuestion",
                            "WriteAnswer",
                        ]
                    );

                    let order = 0;
                    for (const item of vocabGroup.questions) {
                        order++;
                        const exId = await createExercise(
                            conn,
                            vocabSetId,
                            "vocab",
                            order
                        );
                        await createExerciseVocab(conn, exId, item);
                    }
                    await updateSetTotal(conn, vocabSetId);
                }

                // --- Group 2: fill_blank ---
                const fbGroup = groups.find(
                    (g) =>
                        Array.isArray(g.types) &&
                        g.types.includes("FillInTheBlank")
                );
                if (
                    fbGroup &&
                    Array.isArray(fbGroup.questions) &&
                    fbGroup.questions.length
                ) {
                    const fbSetId = await createSet(
                        conn,
                        lessonId,
                        "fill_blank",
                        "Điền khuyết",
                        2,
                        ["FillInTheBlank"]
                    );

                    let order = 0;
                    for (const item of fbGroup.questions) {
                        order++;
                        const exId = await createExercise(
                            conn,
                            fbSetId,
                            "fill_blank",
                            order
                        );
                        await createExerciseFillBlank(conn, exId, item);
                    }
                    await updateSetTotal(conn, fbSetId);
                }
            }
        }

        await conn.commit();
        console.log("✅ Seed courses done.");
    } catch (err) {
        await conn.rollback();
        console.error("❌ Seed failed:", err);
        process.exitCode = 1;
    } finally {
        conn.release();
        await pool.end();
    }
}

seed();
