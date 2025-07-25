import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const all = await prisma.databaseConnection.findMany()
    const seen = new Set()

    for (const item of all) {
        const key = item.database
        if (seen.has(key)) {
            await prisma.databaseConnection.delete({ where: { id: item.id } })
        } else {
            seen.add(key)
        }
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
