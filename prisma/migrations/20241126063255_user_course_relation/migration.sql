-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('READING', 'VIDEO');

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "type" "MaterialType" NOT NULL DEFAULT 'READING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastViewedCourseId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lastViewedCourseId_fkey" FOREIGN KEY ("lastViewedCourseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
