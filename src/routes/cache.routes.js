import { Router } from "express";
import { getCodigoEgestor } from "../services/produtoCacheService.js";

const router = Router();

router.get("/:codigoProprio", async (req, res) => {
    const { codigoProprio } = req.params;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!codigoProprio || !token) {
        return res.status(400).json({ error: "Código ou token ausente" });
    }

    const codigoEgestor = await getCodigoEgestor(codigoProprio, token);
    if (!codigoEgestor) {
        return res.status(404).json({ error: "Produto não encontrado no cache" });
    }

    res.json({ codigoEgestor });
});

export default router;
