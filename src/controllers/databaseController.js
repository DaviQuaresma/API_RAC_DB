import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAll(req, res) {
  const all = await prisma.databaseConnection.findMany();
  res.json(all);
}

export async function create(req, res) {
  const data = req.body;
  const created = await prisma.databaseConnection.create({ data });
  res.status(201).json(created);
}

export async function update(req, res) {
  const { id } = req.params;
  const updated = await prisma.databaseConnection.update({
    where: { id: parseInt(id) },
    data: req.body
  });
  res.json(updated);
}

export async function remove(req, res) {
  const { id } = req.params;
  await prisma.databaseConnection.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
}
