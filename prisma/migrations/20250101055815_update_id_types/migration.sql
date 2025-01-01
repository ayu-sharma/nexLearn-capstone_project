/*
  Warnings:

  - The primary key for the `Assessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `correctAnswersCount` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Assessment` table. All the data in the column will be lost.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `correctAnswers` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `lastViewedAt` on the `Course` table. All the data in the column will be lost.
  - The primary key for the `Module` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completed` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Module` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lastViewedCourseId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserScore` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseId,index]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `materialId` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `index` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MaterialType" ADD VALUE 'ASSESSMENT';

-- DropForeignKey
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_courseId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lastViewedCourseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserScore" DROP CONSTRAINT "UserScore_userId_fkey";

-- AlterTable
ALTER TABLE "Assessment" DROP CONSTRAINT "Assessment_pkey",
DROP COLUMN "correctAnswersCount",
DROP COLUMN "level",
DROP COLUMN "moduleId",
DROP COLUMN "type",
ADD COLUMN     "materialId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assessment_id_seq";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "correctAnswers",
DROP COLUMN "lastViewedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Course_id_seq";

-- AlterTable
ALTER TABLE "Module" DROP CONSTRAINT "Module_pkey",
DROP COLUMN "completed",
DROP COLUMN "type",
DROP COLUMN "videoUrl",
ADD COLUMN     "index" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Module_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Module_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "lastViewedCourseId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "UserCourse";

-- DropTable
DROP TABLE "UserScore";

-- DropEnum
DROP TYPE "AssessmentType";

-- DropEnum
DROP TYPE "Level";

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "type" "MaterialType" NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "content" TEXT,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartedCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "StartedCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPerformance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseType" "CourseType" NOT NULL,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "correctDSA" INTEGER NOT NULL DEFAULT 0,
    "correctMCQ" INTEGER NOT NULL DEFAULT 0,
    "totalDSA" INTEGER NOT NULL DEFAULT 0,
    "totalMCQ" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StartedCourse_userId_courseId_key" ON "StartedCourse"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_courseId_index_key" ON "Module"("courseId", "index");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartedCourse" ADD CONSTRAINT "StartedCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartedCourse" ADD CONSTRAINT "StartedCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPerformance" ADD CONSTRAINT "UserPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
