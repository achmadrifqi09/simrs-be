/*
  Warnings:

  - You are about to drop the column `jenis_aplikasi` on the `db_pendaftaran_online` table. All the data in the column will be lost.
  - Added the required column `asal_pengambilan` to the `db_pendaftaran_online` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `db_pendaftaran_online` DROP COLUMN `jenis_aplikasi`,
    ADD COLUMN `asal_pengambilan` INTEGER NOT NULL;
