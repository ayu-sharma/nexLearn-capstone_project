/*
  Warnings:

  - You are about to drop the column `content` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "content",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "subhead1" TEXT NOT NULL,
    "subhead2" TEXT,
    "paragraph1" TEXT NOT NULL,
    "paragraph2" TEXT,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_moduleId_key" ON "Content"("moduleId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
