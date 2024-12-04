/*
  Warnings:

  - You are about to alter the column `nomor_antrian_poli` on the `db_pendaftaran` table. The data in that column could be lost. The data in that column will be cast from `VarChar(3)` to `Int`.

*/
-- AlterTable
ALTER TABLE `db_pendaftaran` MODIFY `nomor_antrian_poli` INTEGER NULL;
