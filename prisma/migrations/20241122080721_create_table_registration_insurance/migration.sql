/*
  Warnings:

  - You are about to drop the column `pjs` on the `db_pegawai` table. All the data in the column will be lost.
  - You are about to alter the column `status_pns` on the `db_pegawai` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `status_aktif` on the `db_pegawai` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to drop the column `asal_pengambilan` on the `db_pendaftaran_online` table. All the data in the column will be lost.
  - You are about to drop the column `id_warga_negara` on the `db_pendaftaran_online` table. All the data in the column will be lost.
  - You are about to drop the column `kode_antrian` on the `db_pendaftaran_online` table. All the data in the column will be lost.
  - You are about to drop the column `no_antrian` on the `db_pendaftaran_online` table. All the data in the column will be lost.
  - You are about to alter the column `created_by` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to alter the column `modified_at` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `modified_by` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to alter the column `deleted_at` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `deleted_by` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - You are about to alter the column `restored_at` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `restored_by` on the `db_pendaftaran_online` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - Added the required column `jenis_aplikasi` to the `db_pendaftaran_online` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_desa_asal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_desa_tinggal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_kecamatan_asal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_kecamatan_tinggal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_kota_asal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_kota_tinggal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_negara_tinggal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_provinsi_asal_fkey`;

-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_provinsi_tinggal_fkey`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_asal_pengambilan_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_created_at_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_deleted_at_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_email_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_jenis_pasien_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_jenis_penjamin_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_kode_antrian_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_no_antrian_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_restored_at_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_tgl_cekin_idx` ON `db_pendaftaran_online`;

-- DropIndex
DROP INDEX `db_pendaftaran_online_tgl_lahir_idx` ON `db_pendaftaran_online`;

-- AlterTable
ALTER TABLE `db_pegawai` DROP COLUMN `pjs`,
    ADD COLUMN `id_unit_kerja` INTEGER NULL,
    MODIFY `id_ms_provinsi_asal` VARCHAR(191) NULL,
    MODIFY `id_ms_kota_asal` VARCHAR(191) NULL,
    MODIFY `id_ms_kecamatan_asal` VARCHAR(191) NULL,
    MODIFY `id_ms_desa_asal` VARCHAR(191) NULL,
    MODIFY `id_ms_negara_tinggal` INTEGER NULL,
    MODIFY `id_ms_provinsi_tinggal` VARCHAR(191) NULL,
    MODIFY `id_ms_kota_tinggal` VARCHAR(191) NULL,
    MODIFY `id_ms_kecamatan_tinggal` VARCHAR(191) NULL,
    MODIFY `id_ms_desa_tinggal` VARCHAR(191) NULL,
    MODIFY `alamat_tinggal` TEXT NULL,
    MODIFY `kode_pos_tinggal` VARCHAR(10) NULL,
    MODIFY `rt_tinggal` VARCHAR(3) NULL,
    MODIFY `rw_tinggal` VARCHAR(3) NULL,
    MODIFY `id_ms_status_kawin` INTEGER NULL,
    MODIFY `id_ms_agama` INTEGER NULL,
    MODIFY `id_ms_pendidikan` INTEGER NULL,
    MODIFY `id_ms_jenis_pegawai` INTEGER NULL,
    MODIFY `id_ms_status_pegawai` INTEGER NULL,
    MODIFY `id_unit_induk` INTEGER NULL,
    MODIFY `id_pangkat` INTEGER NULL,
    MODIFY `id_jabatan` INTEGER NULL,
    MODIFY `id_unit_jabatan` INTEGER NULL,
    MODIFY `no_npwp` VARCHAR(25) NULL,
    MODIFY `no_ktp` VARCHAR(25) NULL,
    MODIFY `no_ktam` VARCHAR(25) NULL,
    MODIFY `id_finger` VARCHAR(10) NULL,
    MODIFY `tgl_masuk` DATE NULL,
    MODIFY `status_pns` TINYINT NULL DEFAULT 1,
    MODIFY `status_aktif` TINYINT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `db_pendaftaran_online` DROP COLUMN `asal_pengambilan`,
    DROP COLUMN `id_warga_negara`,
    DROP COLUMN `kode_antrian`,
    DROP COLUMN `no_antrian`,
    ADD COLUMN `jenis_aplikasi` INTEGER NOT NULL,
    MODIFY `kode_rm` VARCHAR(20) NULL,
    MODIFY `no_bpjs` VARCHAR(50) NULL,
    MODIFY `nama_pekerjaan` VARCHAR(100) NULL,
    MODIFY `suku` VARCHAR(50) NULL,
    MODIFY `id_ms_propinsi_asal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_kota_asal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_kecamatan_asal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_desa_asal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_provinsi_tinggal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_kota_tinggal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_desa_tinggal` VARCHAR(191) NOT NULL,
    MODIFY `id_ms_kecamatan_tinggal` VARCHAR(191) NOT NULL,
    MODIFY `created_by` INTEGER NOT NULL DEFAULT 0,
    MODIFY `modified_at` DATETIME(0) NULL,
    MODIFY `modified_by` INTEGER NULL DEFAULT 0,
    MODIFY `deleted_at` DATETIME(0) NULL,
    MODIFY `deleted_by` INTEGER NULL DEFAULT 0,
    MODIFY `restored_at` DATETIME(0) NULL,
    MODIFY `restored_by` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `db_pendaftaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_registrasi` VARCHAR(50) NOT NULL,
    `id_antrian` INTEGER NOT NULL,
    `id_online` INTEGER NOT NULL,
    `kode_rm` VARCHAR(50) NOT NULL,
    `tgl_daftar` DATETIME(3) NOT NULL,
    `id_asuransi` INTEGER NOT NULL,
    `nomor_asuransi` VARCHAR(50) NOT NULL,
    `no_rujukan` VARCHAR(50) NOT NULL,
    `status_rujukan` INTEGER NOT NULL,
    `nomor_rujuk_balik` VARCHAR(50) NOT NULL,
    `no_sep` VARCHAR(50) NULL,
    `cob` INTEGER NULL,
    `no_cob` VARCHAR(50) NULL,
    `status_bpjs` INTEGER NOT NULL DEFAULT 0,
    `status_keu` INTEGER NOT NULL DEFAULT 0,
    `status_inap` INTEGER NOT NULL DEFAULT 0,
    `status_koding` INTEGER NOT NULL DEFAULT 0,
    `status_bayar` INTEGER NOT NULL DEFAULT 0,
    `tgl_pulang` DATETIME(3) NULL,
    `nama_wali` VARCHAR(50) NOT NULL,
    `telp_wali` VARCHAR(50) NOT NULL,
    `id_hub_wali` INTEGER NOT NULL,
    `asal_rujukan` VARCHAR(100) NULL,
    `nama_perujuk` VARCHAR(100) NULL,
    `tgl_rujukan` DATE NULL,
    `ket_rujukan` TEXT NULL,
    `kode_antrian_poli` VARCHAR(10) NOT NULL,
    `nomor_antrian_poli` VARCHAR(3) NOT NULL,
    `status_batal` INTEGER NOT NULL DEFAULT 0,
    `keterangan_batal` TEXT NULL,
    `task_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL DEFAULT 0,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL DEFAULT 0,
    `restored_at` DATETIME(0) NULL,
    `restored_by` INTEGER NULL DEFAULT 0,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    INDEX `db_pendaftaran_nomor_registrasi_idx`(`nomor_registrasi`),
    INDEX `db_pendaftaran_kode_rm_idx`(`kode_rm`),
    INDEX `db_pendaftaran_id_antrian_idx`(`id_antrian`),
    INDEX `db_pendaftaran_id_asuransi_idx`(`id_asuransi`),
    INDEX `db_pendaftaran_id_hub_wali_idx`(`id_hub_wali`),
    INDEX `db_pendaftaran_no_sep_idx`(`no_sep`),
    INDEX `db_pendaftaran_tgl_daftar_idx`(`tgl_daftar`),
    INDEX `db_pendaftaran_status_bpjs_status_keu_status_inap_status_kod_idx`(`status_bpjs`, `status_keu`, `status_inap`, `status_koding`, `status_bayar`),
    INDEX `db_pendaftaran_is_deleted_idx`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_biaya_pendaftaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pendaftaran` INTEGER NOT NULL,
    `biaya_daftar` VARCHAR(20) NOT NULL,
    `diskon_daftar` VARCHAR(20) NOT NULL,
    `biaya_kartu` VARCHAR(20) NOT NULL DEFAULT '0000-00-00 00:00:00',
    `diskon_kartu` VARCHAR(20) NOT NULL,
    `biaya_dokter` VARCHAR(20) NOT NULL,
    `diskon_dokter` VARCHAR(20) NOT NULL,
    `tgl_billing_daftar` DATETIME(3) NOT NULL,
    `tgl_billing_daftar_selesai` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL DEFAULT 0,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL DEFAULT 0,
    `restored_at` DATETIME(0) NULL,
    `restored_by` INTEGER NULL DEFAULT 0,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    INDEX `db_biaya_pendaftaran_id_pendaftaran_idx`(`id_pendaftaran`),
    INDEX `db_biaya_pendaftaran_tgl_billing_daftar_idx`(`tgl_billing_daftar`),
    INDEX `db_biaya_pendaftaran_is_deleted_idx`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_asuransi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_asuransi` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL DEFAULT 0,
    `modified_at` DATETIME(0) NULL,
    `modified_by` INTEGER NULL DEFAULT 0,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` INTEGER NULL DEFAULT 0,
    `restored_at` DATETIME(0) NULL,
    `restored_by` INTEGER NULL DEFAULT 0,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    INDEX `db_asuransi_nama_asuransi_idx`(`nama_asuransi`),
    INDEX `db_asuransi_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `db_antrian_no_rujukan_no_bpjs_kode_rm_idx` ON `db_antrian`(`no_rujukan`, `no_bpjs`, `kode_rm`);

-- CreateIndex
CREATE INDEX `db_antrian_kode_antrian_status_panggil_status_is_deleted_idx` ON `db_antrian`(`kode_antrian`, `status_panggil`, `status`, `is_deleted`);

-- CreateIndex
CREATE INDEX `db_antrian_created_at_is_deleted_idx` ON `db_antrian`(`created_at`, `is_deleted`);

-- CreateIndex
CREATE INDEX `db_antrian_jenis_pasien_no_hp_tgl_lahir_idx` ON `db_antrian`(`jenis_pasien`, `no_hp`, `tgl_lahir`);

-- CreateIndex
CREATE INDEX `db_antrian_id_ms_loket_antrian_kode_antrian_idx` ON `db_antrian`(`id_ms_loket_antrian`, `kode_antrian`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_ms_golongan_darah_idx` ON `db_pegawai`(`id_ms_golongan_darah`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_ms_agama_idx` ON `db_pegawai`(`id_ms_agama`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_ms_pendidikan_idx` ON `db_pegawai`(`id_ms_pendidikan`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_ms_jenis_pegawai_idx` ON `db_pegawai`(`id_ms_jenis_pegawai`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_ms_status_pegawai_idx` ON `db_pegawai`(`id_ms_status_pegawai`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_ms_spesialis_idx` ON `db_pegawai`(`id_ms_spesialis`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_unit_induk_idx` ON `db_pegawai`(`id_unit_induk`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_unit_kerja_idx` ON `db_pegawai`(`id_unit_kerja`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_pangkat_idx` ON `db_pegawai`(`id_pangkat`);

-- CreateIndex
CREATE INDEX `db_pegawai_id_unit_jabatan_idx` ON `db_pegawai`(`id_unit_jabatan`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_tgl_kunjungan_idx` ON `db_pendaftaran_online`(`tgl_kunjungan`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_status_kawin_idx` ON `db_pendaftaran_online`(`id_ms_status_kawin`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_agama_idx` ON `db_pendaftaran_online`(`id_ms_agama`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_golongan_darah_idx` ON `db_pendaftaran_online`(`id_ms_golongan_darah`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_pendidikan_idx` ON `db_pendaftaran_online`(`id_ms_pendidikan`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_negara_asal_idx` ON `db_pendaftaran_online`(`id_ms_negara_asal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_propinsi_asal_idx` ON `db_pendaftaran_online`(`id_ms_propinsi_asal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_kota_asal_idx` ON `db_pendaftaran_online`(`id_ms_kota_asal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_kecamatan_asal_idx` ON `db_pendaftaran_online`(`id_ms_kecamatan_asal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_desa_asal_idx` ON `db_pendaftaran_online`(`id_ms_desa_asal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_negara_tinggal_idx` ON `db_pendaftaran_online`(`id_ms_negara_tinggal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_provinsi_tinggal_idx` ON `db_pendaftaran_online`(`id_ms_provinsi_tinggal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_kota_tinggal_idx` ON `db_pendaftaran_online`(`id_ms_kota_tinggal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_kecamatan_tinggal_idx` ON `db_pendaftaran_online`(`id_ms_kecamatan_tinggal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_desa_tinggal_idx` ON `db_pendaftaran_online`(`id_ms_desa_tinggal`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_id_ms_loket_antrian_idx` ON `db_pendaftaran_online`(`id_ms_loket_antrian`);

-- CreateIndex
CREATE INDEX `db_pendaftaran_online_is_deleted_idx` ON `db_pendaftaran_online`(`is_deleted`);

-- AddForeignKey
ALTER TABLE `db_pendaftaran` ADD CONSTRAINT `db_pendaftaran_id_antrian_fkey` FOREIGN KEY (`id_antrian`) REFERENCES `db_antrian`(`id_antrian`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran` ADD CONSTRAINT `db_pendaftaran_id_asuransi_fkey` FOREIGN KEY (`id_asuransi`) REFERENCES `db_asuransi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran` ADD CONSTRAINT `db_pendaftaran_id_hub_wali_fkey` FOREIGN KEY (`id_hub_wali`) REFERENCES `ms_status_keluarga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_antrian_fkey` FOREIGN KEY (`id_antrian`) REFERENCES `db_antrian`(`id_antrian`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_status_kawin_fkey` FOREIGN KEY (`id_ms_status_kawin`) REFERENCES `ms_status_kawin`(`id_ms_status_kawin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_agama_fkey` FOREIGN KEY (`id_ms_agama`) REFERENCES `ms_agama`(`id_ms_agama`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_golongan_darah_fkey` FOREIGN KEY (`id_ms_golongan_darah`) REFERENCES `ms_golongan_darah`(`id_ms_golongan_darah`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_pendidikan_fkey` FOREIGN KEY (`id_ms_pendidikan`) REFERENCES `ms_tingkat_pendidikan`(`id_ms_tingkat_pendidikan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_negara_asal_fkey` FOREIGN KEY (`id_ms_negara_asal`) REFERENCES `ms_negara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_propinsi_asal_fkey` FOREIGN KEY (`id_ms_propinsi_asal`) REFERENCES `ms_provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_kota_asal_fkey` FOREIGN KEY (`id_ms_kota_asal`) REFERENCES `ms_kabkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_kecamatan_asal_fkey` FOREIGN KEY (`id_ms_kecamatan_asal`) REFERENCES `ms_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_desa_asal_fkey` FOREIGN KEY (`id_ms_desa_asal`) REFERENCES `ms_desa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_negara_tinggal_fkey` FOREIGN KEY (`id_ms_negara_tinggal`) REFERENCES `ms_negara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_provinsi_tinggal_fkey` FOREIGN KEY (`id_ms_provinsi_tinggal`) REFERENCES `ms_provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_kota_tinggal_fkey` FOREIGN KEY (`id_ms_kota_tinggal`) REFERENCES `ms_kabkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_desa_tinggal_fkey` FOREIGN KEY (`id_ms_desa_tinggal`) REFERENCES `ms_desa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_kecamatan_tinggal_fkey` FOREIGN KEY (`id_ms_kecamatan_tinggal`) REFERENCES `ms_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_online` ADD CONSTRAINT `db_pendaftaran_online_id_ms_loket_antrian_fkey` FOREIGN KEY (`id_ms_loket_antrian`) REFERENCES `ms_loket_antrian`(`id_ms_loket_antrian`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_biaya_pendaftaran` ADD CONSTRAINT `db_biaya_pendaftaran_id_pendaftaran_fkey` FOREIGN KEY (`id_pendaftaran`) REFERENCES `db_pendaftaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_provinsi_asal_fkey` FOREIGN KEY (`id_ms_provinsi_asal`) REFERENCES `ms_provinsi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kota_asal_fkey` FOREIGN KEY (`id_ms_kota_asal`) REFERENCES `ms_kabkot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kecamatan_asal_fkey` FOREIGN KEY (`id_ms_kecamatan_asal`) REFERENCES `ms_kecamatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_desa_asal_fkey` FOREIGN KEY (`id_ms_desa_asal`) REFERENCES `ms_desa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_negara_tinggal_fkey` FOREIGN KEY (`id_ms_negara_tinggal`) REFERENCES `ms_negara`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_provinsi_tinggal_fkey` FOREIGN KEY (`id_ms_provinsi_tinggal`) REFERENCES `ms_provinsi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kota_tinggal_fkey` FOREIGN KEY (`id_ms_kota_tinggal`) REFERENCES `ms_kabkot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kecamatan_tinggal_fkey` FOREIGN KEY (`id_ms_kecamatan_tinggal`) REFERENCES `ms_kecamatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_desa_tinggal_fkey` FOREIGN KEY (`id_ms_desa_tinggal`) REFERENCES `ms_desa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_golongan_darah_fkey` FOREIGN KEY (`id_ms_golongan_darah`) REFERENCES `ms_golongan_darah`(`id_ms_golongan_darah`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_status_kawin_fkey` FOREIGN KEY (`id_ms_status_kawin`) REFERENCES `ms_status_kawin`(`id_ms_status_kawin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_agama_fkey` FOREIGN KEY (`id_ms_agama`) REFERENCES `ms_agama`(`id_ms_agama`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_pendidikan_fkey` FOREIGN KEY (`id_ms_pendidikan`) REFERENCES `ms_tingkat_pendidikan`(`id_ms_tingkat_pendidikan`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_jenis_pegawai_fkey` FOREIGN KEY (`id_ms_jenis_pegawai`) REFERENCES `ms_jenis_pegawai`(`id_ms_jenis_pegawai`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_status_pegawai_fkey` FOREIGN KEY (`id_ms_status_pegawai`) REFERENCES `ms_status_pegawai`(`id_ms_status_pegawai`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_spesialis_fkey` FOREIGN KEY (`id_ms_spesialis`) REFERENCES `ms_spesialis`(`id_ms_spesialis`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_unit_induk_fkey` FOREIGN KEY (`id_unit_induk`) REFERENCES `db_unit_kerja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_unit_kerja_fkey` FOREIGN KEY (`id_unit_kerja`) REFERENCES `db_unit_kerja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_pangkat_fkey` FOREIGN KEY (`id_pangkat`) REFERENCES `ms_pangkat`(`id_ms_pangkat`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_jabatan_fkey` FOREIGN KEY (`id_jabatan`) REFERENCES `ms_jabatan`(`id_ms_jabatan`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_unit_jabatan_fkey` FOREIGN KEY (`id_unit_jabatan`) REFERENCES `db_unit_kerja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `db_pegawai` RENAME INDEX `id_status_kawin` TO `db_pegawai_id_ms_status_kawin_idx`;
