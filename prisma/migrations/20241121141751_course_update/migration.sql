/*
  Warnings:

  - The values [LANGUAGE_SKILLS] on the enum `CourseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseType_new" AS ENUM ('CODING', 'APTITUDE', 'LANGUAGE');
ALTER TABLE "Course" ALTER COLUMN "type" TYPE "CourseType_new" USING ("type"::text::"CourseType_new");
ALTER TABLE "UserScore" ALTER COLUMN "courseType" TYPE "CourseType_new" USING ("courseType"::text::"CourseType_new");
ALTER TYPE "CourseType" RENAME TO "CourseType_old";
ALTER TYPE "CourseType_new" RENAME TO "CourseType";
DROP TYPE "CourseType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "correctAnswersCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "correctAnswers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT;
