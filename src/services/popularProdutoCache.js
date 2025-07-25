// src/services/popularProdutoCache.js
import axios from "axios";
import prisma from "../../prisma/client.js";
import { getDatabaseByToken } from "./databaseService.js";

export async function popularProdutoCache(token) {
    const database = await getDatabaseByToken(token);
    if (!database) return;

    const res = await axios.get("http://localhost:3000/api/produtos", {
        headers: { Authorization: `Bearer ${token}` },
    });

    const produtos = res.data || [];

    const ops = produtos
        .filter(p => p.codigoProprio && p.codigo)
        .map(p => ({
            codigoProprio: p.codigoProprio.toString(),
            codigoEgestor: p.codigo.toString(),
            atualizadoEm: new Date(),
            databaseId: database.id,
        }));

    await prisma.produtoCache.deleteMany({ where: { databaseId: database.id } });
    await prisma.produtoCache.createMany({ data: ops });
}
