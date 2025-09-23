import { Router } from "express";
const router = Router();

router.get("/health", async (req, res) => {
    return res.json({ ok: true, time: new Date().toISOString() });
});

export default router;
