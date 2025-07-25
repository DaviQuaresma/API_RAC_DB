import { Router } from "express";
import { popularProdutoCache } from "../services/popularProdutoCache.js";

const router = Router();

router.post("/popular", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(400).json({ error: "Token ausente" });

    try {
        await popularProdutoCache(token);
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao popular cache:", err);
        res.status(500).json({ error: "Erro ao popular cache" });
    }
});

export default router;
