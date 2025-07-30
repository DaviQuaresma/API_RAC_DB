-- CreateTable
CREATE TABLE "DatabaseConnection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Sem nome',
    "host" TEXT NOT NULL DEFAULT 'localhost',
    "port" INTEGER NOT NULL DEFAULT 5432,
    "user" TEXT NOT NULL DEFAULT 'postgres',
    "password" TEXT NOT NULL DEFAULT '123',
    "database" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DatabaseConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutoCache" (
    "id" SERIAL NOT NULL,
    "codigoProprio" TEXT NOT NULL,
    "codigoEgestor" TEXT NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "databaseId" INTEGER NOT NULL,

    CONSTRAINT "ProdutoCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseConnection_database_key" ON "DatabaseConnection"("database");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseConnection_token_key" ON "DatabaseConnection"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoCache_codigoProprio_databaseId_key" ON "ProdutoCache"("codigoProprio", "databaseId");

-- AddForeignKey
ALTER TABLE "ProdutoCache" ADD CONSTRAINT "ProdutoCache_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "DatabaseConnection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
