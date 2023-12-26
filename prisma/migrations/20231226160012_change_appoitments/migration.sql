/*
  Warnings:

  - You are about to drop the column `employeeId` on the `appointments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_dentistId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_employeeId_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "employeeId";

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
