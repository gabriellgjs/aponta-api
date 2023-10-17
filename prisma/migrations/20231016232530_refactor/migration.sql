/*
  Warnings:

  - You are about to drop the column `created_at` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `people_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `canceled_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `data_time_end` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `data_time_start` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `dentist_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `hire_date` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `people_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `pis_pasep` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `termination_date` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `marital_status` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `people_id` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `permissions` table. All the data in the column will be lost.
  - The primary key for the `role_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_id` on the `role_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `role_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `telephones` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `telephones` table. All the data in the column will be lost.
  - You are about to drop the column `people_id` on the `telephones` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `telephones` table. All the data in the column will be lost.
  - The primary key for the `user_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_id` on the `user_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_permissions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `peopleId` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataTimeEnd` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataTimeStart` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dentistId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hireDate` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleId` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terminationDate` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleId` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `people` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionId` to the `role_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `role_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleId` to the `telephones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephoneNumber` to the `telephones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionId` to the `user_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_people_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_dentist_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_people_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_user_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_people_id_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_role_id_fkey";

-- DropForeignKey
ALTER TABLE "telephones" DROP CONSTRAINT "telephones_people_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropIndex
DROP INDEX "appointments_appointment_id_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "created_at",
DROP COLUMN "people_id",
DROP COLUMN "postal_code",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "peopleId" INTEGER NOT NULL,
ADD COLUMN     "postalCode" VARCHAR(50) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "appointment_id",
DROP COLUMN "canceled_at",
DROP COLUMN "created_at",
DROP COLUMN "data_time_end",
DROP COLUMN "data_time_start",
DROP COLUMN "dentist_id",
DROP COLUMN "employee_id",
DROP COLUMN "patient_id",
DROP COLUMN "updated_at",
ADD COLUMN     "appointmentId" INTEGER,
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataTimeStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dentistId" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "created_at",
DROP COLUMN "hire_date",
DROP COLUMN "people_id",
DROP COLUMN "pis_pasep",
DROP COLUMN "termination_date",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hireDate" VARCHAR(50) NOT NULL,
ADD COLUMN     "peopleId" INTEGER NOT NULL,
ADD COLUMN     "terminationDate" VARCHAR(50) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "created_at",
DROP COLUMN "marital_status",
DROP COLUMN "people_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "maritalStatus" VARCHAR(100) NOT NULL,
ADD COLUMN     "peopleId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "people" DROP COLUMN "birth_date",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "birthDate" VARCHAR(50) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_pkey",
DROP COLUMN "permission_id",
DROP COLUMN "role_id",
ADD COLUMN     "permissionId" INTEGER NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("roleId", "permissionId");

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "telephones" DROP COLUMN "created_at",
DROP COLUMN "number",
DROP COLUMN "people_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "peopleId" INTEGER NOT NULL,
ADD COLUMN     "telephoneNumber" VARCHAR(50) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_pkey",
DROP COLUMN "permission_id",
DROP COLUMN "user_id",
ADD COLUMN     "permissionId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("userId", "permissionId");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "role_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "appointments_appointmentId_key" ON "appointments"("appointmentId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telephones" ADD CONSTRAINT "telephones_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
