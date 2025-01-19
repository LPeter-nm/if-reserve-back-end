-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Type_User" AS ENUM ('ALUNO', 'SERVIDOR', 'EXTERNO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CONCLUIDO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "type_Reserve" AS ENUM ('OFICIO', 'EVENTO', 'AULA');

-- CreateEnum
CREATE TYPE "type_Practice" AS ENUM ('TREINO', 'RECREACAO', 'AMISTOSO');

-- CreateEnum
CREATE TYPE "Ocurrence" AS ENUM ('EVENTO_UNICO', 'SEMANALMENTE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "type_User" "Type_User" NOT NULL DEFAULT 'ALUNO',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Internal" (
    "id" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_Internal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_External" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_External_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restore" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',
    "expiration" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Restore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserve" (
    "id" TEXT NOT NULL,
    "type_Reserve" "type_Reserve" NOT NULL DEFAULT 'OFICIO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" TEXT NOT NULL,
    "type_Practice" "type_Practice" NOT NULL DEFAULT 'RECREACAO',
    "number_People" INTEGER NOT NULL,
    "name_People" TEXT NOT NULL,
    "request_Equipment" TEXT NOT NULL,
    "ocurrence" "Ocurrence" NOT NULL DEFAULT 'EVENTO_UNICO',
    "date_Start" TIMESTAMP(3) NOT NULL,
    "date_End" TIMESTAMP(3) NOT NULL,
    "hour_Start" TIMESTAMP(3) NOT NULL,
    "hour_End" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reserveId" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "matter" TEXT NOT NULL,
    "date_Start" TIMESTAMP(3) NOT NULL,
    "date_End" TIMESTAMP(3) NOT NULL,
    "hour_Start" TIMESTAMP(3) NOT NULL,
    "hour_End" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reserveId" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name_Event" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_Start" TIMESTAMP(3) NOT NULL,
    "date_End" TIMESTAMP(3) NOT NULL,
    "hour_Start" TIMESTAMP(3) NOT NULL,
    "hour_End" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reserveId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Internal_registration_key" ON "User_Internal"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "User_Internal_email_key" ON "User_Internal"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Internal_userId_key" ON "User_Internal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_External_cpf_key" ON "User_External"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_External_email_key" ON "User_External"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_External_userId_key" ON "User_External"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Restore_userId_key" ON "Restore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_userId_key" ON "Reserve"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Sport_reserveId_key" ON "Sport"("reserveId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_reserveId_key" ON "Classroom"("reserveId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_reserveId_key" ON "Event"("reserveId");

-- AddForeignKey
ALTER TABLE "User_Internal" ADD CONSTRAINT "User_Internal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_External" ADD CONSTRAINT "User_External_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restore" ADD CONSTRAINT "Restore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sport" ADD CONSTRAINT "Sport_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reserve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
