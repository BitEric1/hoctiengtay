const { pool } = require("../database/db.translate.js");
const {
    lowerNoTone,
    stripLeadingNumber,
} = require("../utils/text.translate.js");

/** Tày -> Việt: tìm theo matChu / search_string */
async function lookupTayToViet(q, limit = 20) {
    const qTrim = q.trim();
    if (!qTrim) return { items: [], source: "none" };

    const qNoTone = lowerNoTone(qTrim);

    // 1) exact
    const [exact] = await pool.query(
        `SELECT id, matChu, search_string
     FROM dmtu
     WHERE matChu = ? OR search_string = ?
     LIMIT ?`,
        [qTrim, qNoTone, Number(limit)]
    );

    // 2) fallback LIKE (bắt đầu/contains)
    let candidates = exact;
    if (candidates.length === 0) {
        const [likeRows] = await pool.query(
            `SELECT id, matChu, search_string
       FROM dmtu
       WHERE matChu LIKE ? OR search_string LIKE ?
       ORDER BY matChu
       LIMIT ?`,
            [`%${qTrim}%`, `%${qNoTone}%`, Number(limit)]
        );
        candidates = likeRows;
    }

    if (candidates.length === 0) return { items: [], source: "none" };

    const ids = candidates.map((r) => r.id);
    if (ids.length === 0) return { items: [], source: "none" };

    const placeholders = ids.map(() => "?").join(",");
    const [meanings] = await pool.query(
        `SELECT idxMatChu, nghiaTV, nghiaVH, dongNghia, traiNghia, bienThe, ghiChu, hinhAnh
     FROM dmnghia
     WHERE idxMatChu IN (${placeholders})
     ORDER BY id`,
        ids
    );

    const byId = Object.fromEntries(
        candidates.map((w) => [w.id, { ...w, meanings: [] }])
    );
    for (const m of meanings) {
        if (!byId[m.idxMatChu]) continue;
        byId[m.idxMatChu].meanings.push({
            nghiaTV: stripLeadingNumber(m.nghiaTV),
            nghiaVH: m.nghiaVH,
            dongNghia: m.dongNghia,
            traiNghia: m.traiNghia,
            bienThe: m.bienThe,
            ghiChu: m.ghiChu,
            hinhAnh: m.hinhAnh,
        });
    }

    return {
        items: Object.values(byId),
        source: exact.length ? "exact" : "like",
    };
}

/** Việt -> Tày: ưu tiên FULLTEXT; nếu chưa có index thì fallback LIKE */
async function lookupVietToTay(q, limit = 20) {
    const phrase = (q || "").trim();
    if (!phrase) return { items: [], source: "none" };

    // Ưu tiên theo thứ tự: EXACT → STARTSWITH → CONTAINS (accent-insensitive)
    // COLLATE utf8mb4_general_ci giúp bỏ dấu/hoa-thường
    const [exact] = await pool.query(
        `SELECT DISTINCT g.idxMatChu
     FROM dmnghia g
     WHERE g.nghiaTV COLLATE utf8mb4_general_ci = ?
        OR g.nghiaVH COLLATE utf8mb4_general_ci = ?
     LIMIT ?`,
        [phrase, phrase, Number(limit)]
    );

    let idRows = exact,
        source = "exact";

    if (!idRows.length) {
        const [begins] = await pool.query(
            `SELECT DISTINCT g.idxMatChu
       FROM dmnghia g
       WHERE g.nghiaTV COLLATE utf8mb4_general_ci LIKE ?
          OR g.nghiaVH COLLATE utf8mb4_general_ci LIKE ?
       LIMIT ?`,
            [`${phrase}%`, `${phrase}%`, Number(limit)]
        );
        idRows = begins;
        source = "starts";
    }

    if (!idRows.length) {
        const [contains] = await pool.query(
            `SELECT DISTINCT g.idxMatChu
       FROM dmnghia g
       WHERE g.nghiaTV COLLATE utf8mb4_general_ci LIKE ?
          OR g.nghiaVH COLLATE utf8mb4_general_ci LIKE ?
          OR g.dongNghia COLLATE utf8mb4_general_ci LIKE ?
          OR g.traiNghia COLLATE utf8mb4_general_ci LIKE ?
          OR g.ghiChu   COLLATE utf8mb4_general_ci LIKE ?
       LIMIT ?`,
            [
                `%${phrase}%`,
                `%${phrase}%`,
                `%${phrase}%`,
                `%${phrase}%`,
                `%${phrase}%`,
                Number(limit),
            ]
        );
        idRows = contains;
        source = "contains";
    }

    // Fallback cuối: FULLTEXT theo cụm từ → AND-LIKE (khi có từ ngắn 1-2 ký tự)
    if (!idRows.length) {
        try {
            const [rows] = await pool.query(
                `SELECT g.idxMatChu,
                MATCH(g.nghiaTV, g.nghiaVH, g.dongNghia, g.traiNghia, g.ghiChu) AS score
         FROM dmnghia g
         WHERE MATCH(g.nghiaTV, g.nghiaVH, g.dongNghia, g.traiNghia, g.ghiChu)
               AGAINST(CONCAT('\"', ?, '\"') IN BOOLEAN MODE)
         ORDER BY score DESC
         LIMIT ?`,
                [phrase, Number(limit)]
            );
            idRows = rows;
            source = "fulltext-phrase";
        } catch (_) {
            const tokens = phrase.split(/\s+/).filter(Boolean);
            if (tokens.length) {
                const where = tokens
                    .map(
                        () =>
                            "(g.nghiaTV LIKE ? OR g.nghiaVH LIKE ? OR g.dongNghia LIKE ? OR g.traiNghia LIKE ? OR g.ghiChu LIKE ?)"
                    )
                    .join(" AND ");
                const params = tokens.flatMap((t) => Array(5).fill(`%${t}%`));
                const [rows] = await pool.query(
                    `SELECT DISTINCT g.idxMatChu FROM dmnghia g WHERE ${where} LIMIT ?`,
                    [...params, Number(limit)]
                );
                idRows = rows;
                source = "and-like";
            }
        }
    }

    const ids = [...new Set(idRows.map((r) => r.idxMatChu))];
    if (!ids.length) return { items: [], source };

    const placeholders = ids.map(() => "?").join(",");
    const [words] = await pool.query(
        `SELECT id, matChu, search_string FROM dmtu WHERE id IN (${placeholders})`,
        ids
    );
    const wordMap = Object.fromEntries(words.map((w) => [w.id, w]));

    const [meanings] = await pool.query(
        `SELECT idxMatChu, nghiaTV, nghiaVH, dongNghia, traiNghia, bienThe, ghiChu, hinhAnh
       FROM dmnghia
       WHERE idxMatChu IN (${placeholders})
       ORDER BY id`,
        ids
    );

    const byId = Object.fromEntries(
        ids.map((id) => [id, { ...(wordMap[id] ?? { id }), meanings: [] }])
    );
    for (const m of meanings) {
        if (!byId[m.idxMatChu]) continue;
        byId[m.idxMatChu].meanings.push({
            nghiaTV: stripLeadingNumber(m.nghiaTV),
            nghiaVH: m.nghiaVH,
            dongNghia: m.dongNghia,
            traiNghia: m.traiNghia,
            bienThe: m.bienThe,
            ghiChu: m.ghiChu,
            hinhAnh: m.hinhAnh,
        });
    }
    return { items: Object.values(byId), source };
}

/** Gợi ý autocomplete */
async function suggest(sl, q, limit = 10) {
    const qTrim = (q ?? "").trim();
    if (!qTrim) return [];

    if (sl === "tay") {
        const qNo = lowerNoTone(qTrim);
        const [rows] = await pool.query(
            `SELECT DISTINCT matChu
            FROM dmtu
            WHERE matChu LIKE ? OR search_string LIKE ?
            ORDER BY matChu
            LIMIT ?`,
            [`${qTrim}%`, `${qNo}%`, Number(limit)]
        );
        return rows.map((r) => r.matChu);
    } else {
        const [rows] = await pool.query(
            `SELECT DISTINCT SUBSTRING_INDEX(nghiaTV, ' ', 5) AS phrase
            FROM dmnghia
            WHERE nghiaTV COLLATE utf8mb4_general_ci LIKE ?
            LIMIT ?`,
            [`${qTrim}%`, Number(limit)]
        );
        return rows.map((r) => r.phrase).filter(Boolean);
    }
}

module.exports = { lookupTayToViet, lookupVietToTay, suggest };
