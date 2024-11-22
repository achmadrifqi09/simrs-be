/*
  Warnings:

  - You are about to drop the column `status_keu` on the `db_pendaftaran` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `db_pendaftaran` DROP FOREIGN KEY `db_pendaftaran_id_asuransi_fkey`;

-- DropForeignKey
ALTER TABLE `db_pendaftaran` DROP FOREIGN KEY `db_pendaftaran_id_hub_wali_fkey`;

-- DropIndex
DROP INDEX `db_pendaftaran_status_bpjs_status_keu_status_inap_status_kod_idx` ON `db_pendaftaran`;

-- AlterTable
ALTER TABLE `db_pendaftaran` DROP COLUMN `status_keu`,
    ADD COLUMN `status_keuangan` INTEGER NOT NULL DEFAULT 0,
    MODIFY `id_online` INTEGER NULL,
    MODIFY `id_asuransi` INTEGER NULL,
    MODIFY `nomor_asuransi` VARCHAR(50) NULL,
    MODIFY `no_rujukan` VARCHAR(50) NULL,
    MODIFY `status_rujukan` INTEGER NULL,
    MODIFY `nomor_rujuk_balik` VARCHAR(50) NULL,
    MODIFY `nama_wali` VARCHAR(50) NULL,
    MODIFY `telp_wali` VARCHAR(50) NULL,
    MODIFY `id_hub_wali` INTEGER NULL,
    MODIFY `kode_antrian_poli` VARCHAR(10) NULL,
    MODIFY `nomor_antrian_poli` VARCHAR(3) NULL;

-- CreateIndex
CREATE INDEX `db_pendaftaran_status_bpjs_status_keuangan_status_inap_statu_idx` ON `db_pendaftaran`(`status_bpjs`, `status_keuangan`, `status_inap`, `status_koding`, `status_bayar`);

-- AddForeignKey
ALTER TABLE `db_pendaftaran` ADD CONSTRAINT `db_pendaftaran_id_asuransi_fkey` FOREIGN KEY (`id_asuransi`) REFERENCES `db_asuransi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran` ADD CONSTRAINT `db_pendaftaran_id_hub_wali_fkey` FOREIGN KEY (`id_hub_wali`) REFERENCES `ms_status_keluarga`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
