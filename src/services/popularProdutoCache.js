import axios from "axios";
import prisma from "../../prisma/client.js";

export async function popularProdutoCache(token) {
    const databaseToken = await axios.get("http://localhost:5000/api/validar-token")
    if (!databaseToken) return;

    console.log("Token de acesso ao banco de dados:", databaseToken);

    const res = await axios.get("http://localhost:5000/api/produtos", {
        headers: { Authorization: `Bearer ${databaseToken}` },
    });

    console.log("Dados recebidos:", res.data);

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
