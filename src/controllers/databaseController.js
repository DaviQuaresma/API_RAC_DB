import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAll(req, res) {
  try {
    const all = await prisma.databaseConnection.findMany();

    if (all.length === 0) {
      return res.status(404).json({ message: 'No database connections found' });
    }

    console.log('Database connection successful');
    console.log(`Found ${all.length} database connections`);
    res.json(all);

  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getUniqueDatabase(req, res) {
  const database = req.params.database;

  if (!database) {
    return res.status(400).json({ message: "database parameter is required" });
  }

  console.log(`Fetching database connection with name: ${database}`);

  try {
    const unique = await prisma.databaseConnection.findUnique({
      where: { database: database }
    });

    if (!unique) {
      return res.status(404).json({ message: 'Database connection not found' });
    }

    console.log('Database connection successful');
    console.log(`Found database connection with name: ${database}`);
    res.json(unique);

  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export async function create(req, res) {
  const data = req.body;
  try {
    const created = await prisma.databaseConnection.create({ data });
    console.log('Created new database connection');
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating database connection:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  try {
    const updated = await prisma.databaseConnection.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    console.log(`Updated database connection with id: ${id}`);
    res.json(updated);
  } catch (error) {
    console.error(`Error updating database connection with id: ${id}`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Database connection not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function remove(req, res) {
  const { id } = req.params;
  try {
    await prisma.databaseConnection.delete({ where: { id: parseInt(id) } });
    console.log(`Deleted database connection with id: ${id}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting database connection with id: ${id}`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Database connection not found' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
