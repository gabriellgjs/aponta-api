/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `people` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "people_cpf_key" ON "people"("cpf");
