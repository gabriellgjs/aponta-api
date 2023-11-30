/*
  Warnings:

  - You are about to drop the column `description` on the `roles` table. All the data in the column will be lost.
  - Changed the type of `hireDate` on the `employees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `birthDate` on the `people` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "hireDate",
ADD COLUMN     "hireDate" DATE NOT NULL;

-- AlterTable
ALTER TABLE "people" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" DATE NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "description";
