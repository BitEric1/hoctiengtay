const express = require("express");
const {
    lookupTayToViet,
    lookupVietToTay,
    suggest,
} = require("../services/translate.service.js");
const router = express.Router();

/**
 * GET /api/translate?sl=tay&tl=vi&q=...
 * GET /api/translate?sl=vi&tl=tay&q=...
 */
router.get("/translate", async (req, res, next) => {
    try {
        const { sl = "tay", tl = "vi", q = "" } = req.query;
        if (!q.trim()) return res.json({ query: q, items: [] });

        const data =
            sl === "tay" ? await lookupTayToViet(q) : await lookupVietToTay(q);
        res.json({ query: q, sl, tl, ...data });
    } catch (e) {
        next(e);
    }
});

/** Batch: POST /api/translate (body: { sl, tl, queries:[] }) */
router.post("/translate", async (req, res, next) => {
    try {
        const { sl = "tay", tl = "vi", queries = [] } = req.body || {};
        const fn = sl === "tay" ? lookupTayToViet : lookupVietToTay;
        const results = {};
        for (const q of queries) results[q] = await fn(q);
        res.json({ sl, tl, results });
    } catch (e) {
        next(e);
    }
});

/** Gợi ý */
router.get("/suggest", async (req, res, next) => {
    try {
        const { sl = "tay", q = "" } = req.query;
        const list = q ? await suggest(sl, q) : [];
        res.json({ suggestions: list });
    } catch (e) {
        next(e);
    }
});
module.exports = router;
