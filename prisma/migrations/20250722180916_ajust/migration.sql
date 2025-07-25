/*
  Warnings:

  - A unique constraint covering the columns `[database]` on the table `DatabaseConnection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `DatabaseConnection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DatabaseConnection_database_key" ON "DatabaseConnection"("database");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseConnection_token_key" ON "DatabaseConnection"("token");
