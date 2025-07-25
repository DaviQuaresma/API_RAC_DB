-- CreateTable
CREATE TABLE "ProdutoCache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoProprio" TEXT NOT NULL,
    "codigoEgestor" TEXT NOT NULL,
    "atualizadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "databaseId" INTEGER NOT NULL,
    CONSTRAINT "ProdutoCache_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "DatabaseConnection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoCache_codigoProprio_databaseId_key" ON "ProdutoCache"("codigoProprio", "databaseId");
