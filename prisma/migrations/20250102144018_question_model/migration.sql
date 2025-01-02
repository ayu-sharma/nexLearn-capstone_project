/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "correctAnswer",
DROP COLUMN "options",
DROP COLUMN "question";

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "options" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
