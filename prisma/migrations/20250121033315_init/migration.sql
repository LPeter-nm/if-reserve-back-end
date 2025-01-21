/*
  Warnings:

  - You are about to drop the column `date_End` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `date_Start` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `hour_End` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `hour_Start` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `date_End` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `date_Start` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `hour_End` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `hour_Start` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `date_End` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `date_Start` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `hour_End` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `hour_Start` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `ocurrence` on the `Sport` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User_External` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User_External` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User_External` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User_Internal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User_Internal` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User_Internal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date_End` to the `Reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_Start` to the `Reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour_End` to the `Reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour_Start` to the `Reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_External_email_key";

-- DropIndex
DROP INDEX "User_Internal_email_key";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "date_End",
DROP COLUMN "date_Start",
DROP COLUMN "hour_End",
DROP COLUMN "hour_Start";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date_End",
DROP COLUMN "date_Start",
DROP COLUMN "hour_End",
DROP COLUMN "hour_Start";

-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "date_End" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date_Start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hour_End" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hour_Start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ocurrence" "Ocurrence" NOT NULL DEFAULT 'EVENTO_UNICO';

-- AlterTable
ALTER TABLE "Sport" DROP COLUMN "date_End",
DROP COLUMN "date_Start",
DROP COLUMN "hour_End",
DROP COLUMN "hour_Start",
DROP COLUMN "ocurrence";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_External" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "User_Internal" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password";

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "name_User" TEXT NOT NULL,
    "people_Appear" TEXT NOT NULL,
    "requested_Equipment" TEXT NOT NULL,
    "description_Court" TEXT NOT NULL,
    "description_Equipment" TEXT NOT NULL,
    "time_Used" TEXT NOT NULL,
    "date_Used" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reserveId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_reserveId_key" ON "Report"("reserveId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
