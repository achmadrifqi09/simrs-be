/*
  Warnings:

  - Added the required column `no_ktam` to the `db_pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `db_pegawai` ADD COLUMN `file_kk` TEXT NULL,
    ADD COLUMN `file_ktam` TEXT NULL,
    ADD COLUMN `file_ktp` TEXT NULL,
    ADD COLUMN `file_npwp` TEXT NULL,
    ADD COLUMN `no_ktam` VARCHAR(25) NOT NULL;
