/*
  Warnings:

  - The primary key for the `RolePermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_pkey",
ADD CONSTRAINT "RolePermissions_pkey" PRIMARY KEY ("role_id", "permission_id");
