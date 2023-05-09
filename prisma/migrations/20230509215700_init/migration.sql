/*
  Warnings:

  - You are about to drop the column `person_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `telephones` table. All the data in the column will be lost.
  - Added the required column `people_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people_id` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people_id` to the `telephones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_person_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_person_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_person_id_fkey";

-- DropForeignKey
ALTER TABLE "telephones" DROP CONSTRAINT "telephones_person_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "person_id",
ADD COLUMN     "people_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "person_id",
ADD COLUMN     "people_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "person_id",
ADD COLUMN     "people_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "telephones" DROP COLUMN "person_id",
ADD COLUMN     "people_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telephones" ADD CONSTRAINT "telephones_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
