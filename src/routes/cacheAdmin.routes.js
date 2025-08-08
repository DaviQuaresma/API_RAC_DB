import { Router } from "express";
import { popularProdutoCache } from "../services/popularProdutoCache.js";

const router = Router();

router.post("/popular", async (req, res) => {
    try {
        await popularProdutoCache();
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao popular cache:", err);
        res.status(500).json({ error: "Erro ao popular cache" });
    }
});

export default router;
