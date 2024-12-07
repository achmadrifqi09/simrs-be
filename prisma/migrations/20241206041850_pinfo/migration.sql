/*
  Warnings:

  - You are about to alter the column `kode_dpjp` on the `db_pegawai` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `db_pegawai` MODIFY `kode_dpjp` VARCHAR(10) NULL;
