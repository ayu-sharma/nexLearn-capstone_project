/*
  Warnings:

  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.
  - Added the required column `optionA` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionB` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionC` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionD` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "options",
ADD COLUMN     "optionA" TEXT NOT NULL,
ADD COLUMN     "optionB" TEXT NOT NULL,
ADD COLUMN     "optionC" TEXT NOT NULL,
ADD COLUMN     "optionD" TEXT NOT NULL;
