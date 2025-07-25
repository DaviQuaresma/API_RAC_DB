import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCodigoEgestor(codigoProprio, token) {
    const db = await prisma.databaseConnection.findUnique({ where: { token } });
    if (!db) return null;

    const cache = await prisma.produtoCache.findUnique({
        where: {
            codigoProprio_databaseId: {
                codigoProprio,
                databaseId: db.id,
            },
        },
    });

    return cache?.codigoEgestor || null;
}

export async function setCodigoEgestor(codigoProprio, codigoEgestor, token) {
    const db = await prisma.databaseConnection.findUnique({ where: { token } });
    if (!db) return;

    await prisma.produtoCache.upsert({
        where: {
            codigoProprio_databaseId: {
                codigoProprio,
                databaseId: db.id,
            },
        },
        update: {
            codigoEgestor,
            atualizadoEm: new Date(),
        },
        create: {
            codigoProprio,
            codigoEgestor,
            databaseId: db.id,
        },
    });
}
