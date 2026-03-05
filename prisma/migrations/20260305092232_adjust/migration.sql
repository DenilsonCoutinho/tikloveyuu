/*
  Warnings:

  - You are about to drop the column `email` on the `MemoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `idCostumerAsaas` on the `MemoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `MemoryItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MemoryItem" DROP COLUMN "email",
DROP COLUMN "idCostumerAsaas",
DROP COLUMN "paid";

-- AlterTable
ALTER TABLE "UserMemories" ADD COLUMN     "email" TEXT,
ADD COLUMN     "idCostumerAsaas" TEXT,
ADD COLUMN     "paid" TEXT;
