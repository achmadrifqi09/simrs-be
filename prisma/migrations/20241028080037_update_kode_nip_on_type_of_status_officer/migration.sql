/*
  Warnings:

  - Added the required column `kode_nip` to the `ms_jenis_pegawai_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_jenis_pegawai_status` ADD COLUMN `kode_nip` VARCHAR(2) NOT NULL;
