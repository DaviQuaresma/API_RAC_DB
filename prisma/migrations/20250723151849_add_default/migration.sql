-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DatabaseConnection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Sem nome',
    "host" TEXT NOT NULL DEFAULT 'localhost',
    "port" INTEGER NOT NULL DEFAULT 5432,
    "user" TEXT NOT NULL DEFAULT 'postgres',
    "password" TEXT NOT NULL DEFAULT '123',
    "database" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_DatabaseConnection" ("createdAt", "database", "host", "id", "name", "password", "port", "token", "updatedAt", "user") SELECT "createdAt", "database", "host", "id", "name", "password", "port", "token", "updatedAt", "user" FROM "DatabaseConnection";
DROP TABLE "DatabaseConnection";
ALTER TABLE "new_DatabaseConnection" RENAME TO "DatabaseConnection";
CREATE UNIQUE INDEX "DatabaseConnection_database_key" ON "DatabaseConnection"("database");
CREATE UNIQUE INDEX "DatabaseConnection_token_key" ON "DatabaseConnection"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
