/*
  Warnings:

  - You are about to drop the column `name_Event` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type_Reserve` on the `Reserve` table. All the data in the column will be lost.
  - You are about to drop the column `name_People` on the `Sport` table. All the data in the column will be lost.
  - The `type_Practice` column on the `Sport` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_People` to the `Sport` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type_Reserve" AS ENUM ('OFICIO', 'EVENTO', 'AULA');

-- CreateEnum
CREATE TYPE "Type_Practice" AS ENUM ('TREINO', 'RECREACAO', 'AMISTOSO');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "name_Event",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reserve" DROP COLUMN "type_Reserve",
ADD COLUMN     "Type_Reserve" "Type_Reserve" NOT NULL DEFAULT 'OFICIO';

-- AlterTable
ALTER TABLE "Sport" DROP COLUMN "name_People",
ADD COLUMN     "description_People" TEXT NOT NULL,
DROP COLUMN "type_Practice",
ADD COLUMN     "type_Practice" "Type_Practice" NOT NULL DEFAULT 'RECREACAO';

-- DropEnum
DROP TYPE "type_Practice";

-- DropEnum
DROP TYPE "type_Reserve";
