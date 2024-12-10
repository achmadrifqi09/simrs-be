/*
  Warnings:

  - You are about to drop the column `kode_reponse` on the `db_pendaftaran_taskid` table. All the data in the column will be lost.
  - Added the required column `kode_response` to the `db_pendaftaran_taskid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `db_pendaftaran_taskid` DROP COLUMN `kode_reponse`,
    ADD COLUMN `kode_response` INTEGER NOT NULL;
