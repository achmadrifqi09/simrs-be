-- CreateTable
CREATE TABLE `db_client` (
    `client_id` VARCHAR(191) NOT NULL,
    `nama_client` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_menu` (
    `id_menu` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_id_menu` INTEGER NOT NULL,
    `nama_menu` VARCHAR(100) NOT NULL,
    `urutan` INTEGER NOT NULL,
    `icon_menu` VARCHAR(100) NOT NULL,
    `page` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL DEFAULT '0',
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_menu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_pasien` (
    `id_pasien` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_rm` VARCHAR(20) NOT NULL DEFAULT '',
    `nama_pasien` VARCHAR(100) NOT NULL,
    `tempat_lahir` VARCHAR(100) NOT NULL,
    `tgl_lahir` DATE NOT NULL,
    `jenis_kelamin` INTEGER NOT NULL,
    `identitas_pasien` INTEGER NOT NULL,
    `no_identitas` VARCHAR(100) NOT NULL,
    `id_ms_negara_tinggal` INTEGER NOT NULL,
    `id_ms_provinsi_tinggal` INTEGER NOT NULL,
    `id_ms_kota_tinggal` INTEGER NOT NULL,
    `id_ms_kecamatan_tinggal` INTEGER NOT NULL,
    `id_ms_desa_tinggal` INTEGER NOT NULL,
    `alamat_tinggal` TEXT NOT NULL,
    `rt_tinggal` VARCHAR(5) NOT NULL,
    `rw_tinggal` VARCHAR(5) NOT NULL,
    `kode_pos_tinggal` VARCHAR(10) NOT NULL,
    `alamatgab_tinggal` TEXT NOT NULL,
    `hp` VARCHAR(20) NOT NULL,
    `suku` VARCHAR(50) NOT NULL,
    `nama_ibu_kandung` VARCHAR(100) NOT NULL,
    `id_ms_status_kawin` INTEGER NOT NULL DEFAULT 0,
    `id_ms_golongan_darah` INTEGER NOT NULL DEFAULT 0,
    `id_ms_agama` INTEGER NOT NULL,
    `live` INTEGER NOT NULL,
    `rt_asal` VARCHAR(5) NOT NULL,
    `rw_asal` VARCHAR(5) NOT NULL,
    `id_ms_propinsi_asal` VARCHAR(20) NOT NULL,
    `id_ms_kota_asal` VARCHAR(20) NOT NULL,
    `id_ms_kecamatan_asal` VARCHAR(20) NOT NULL,
    `id_ms_desa_asal` VARCHAR(20) NOT NULL,
    `alamat_asal` TEXT NOT NULL,
    `alamatgab_asal` TEXT NOT NULL,
    `nama_pekerjaan` VARCHAR(100) NOT NULL,
    `kode_pos_asal` VARCHAR(10) NOT NULL,
    `no_bpjs` VARCHAR(50) NOT NULL,
    `id_ms_pendidikan` INTEGER NOT NULL,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `restored_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `modified_at` DATETIME(0) NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `created_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id_pasien`, `kode_rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_pegawai` (
    `id_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `no_reg` VARCHAR(50) NOT NULL,
    `nip_pegawai` VARCHAR(50) NOT NULL,
    `nip_pns` VARCHAR(50) NOT NULL,
    `gelar_depan` VARCHAR(100) NOT NULL,
    `gelar_belakang` VARCHAR(100) NOT NULL,
    `nama_pegawai` VARCHAR(100) NOT NULL,
    `id_ms_negara_asal` INTEGER NOT NULL,
    `id_ms_provinsi_asal` INTEGER NOT NULL,
    `id_ms_kota_asal` INTEGER NOT NULL,
    `id_ms_kecamatan_asal` INTEGER NOT NULL,
    `id_ms_desa_asal` INTEGER NOT NULL,
    `alamat_asal` TEXT NOT NULL,
    `kode_pos_asal` VARCHAR(10) NOT NULL,
    `rt_asal` VARCHAR(5) NOT NULL,
    `rw_asal` VARCHAR(5) NOT NULL,
    `id_ms_negara_tinggal` INTEGER NOT NULL,
    `id_ms_provinsi_tinggal` INTEGER NOT NULL,
    `id_ms_kota_tinggal` INTEGER NOT NULL,
    `id_ms_kecamatan_tinggal` INTEGER NOT NULL,
    `id_ms_desa_tinggal` INTEGER NOT NULL,
    `alamat_tinggal` TEXT NOT NULL,
    `kode_pos_tinggal` VARCHAR(10) NOT NULL,
    `rt_tinggal` VARCHAR(3) NOT NULL,
    `rw_tinggal` VARCHAR(3) NOT NULL,
    `tempat_lahir` VARCHAR(100) NOT NULL,
    `tgl_lahir` DATE NOT NULL,
    `id_jenis_kelamin` INTEGER NOT NULL,
    `id_ms_golongan_darah` INTEGER NOT NULL,
    `id_ms_status_kawin` INTEGER NOT NULL,
    `id_ms_agama` INTEGER NOT NULL,
    `id_ms_pendidikan` INTEGER NOT NULL,
    `id_ms_jenis_pegawai` INTEGER NOT NULL,
    `id_ms_status_pegawai` INTEGER NOT NULL,
    `id_ms_spesialis` INTEGER NOT NULL,
    `id_unit_induk` INTEGER NOT NULL,
    `id_unit_kerja` INTEGER NOT NULL,
    `id_pangkat` INTEGER NOT NULL,
    `id_jabatan` INTEGER NOT NULL,
    `id_unit_jabatan` INTEGER NOT NULL,
    `id_gaji` INTEGER NOT NULL,
    `pjs` INTEGER NOT NULL,
    `hp` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `no_npwp` VARCHAR(25) NOT NULL,
    `no_ktp` VARCHAR(25) NOT NULL,
    `foto` TEXT NOT NULL,
    `kode_arsip` VARCHAR(20) NOT NULL,
    `id_finger` VARCHAR(10) NOT NULL,
    `kode_dpjp` VARCHAR(20) NOT NULL,
    `tgl_masuk` DATE NOT NULL,
    `tgl_keluar` DATE NOT NULL,
    `status_pns` INTEGER NOT NULL,
    `status_aktif` INTEGER NOT NULL,
    `id_pelamar` INTEGER NOT NULL,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `restored_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `modified_at` DATETIME(0) NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `created_at` DATETIME(0) NOT NULL,

    INDEX `id_status_kawin`(`id_ms_status_kawin`),
    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_unit_kerja` (
    `id_unit_kerja` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_id_unit` INTEGER NOT NULL,
    `nama_unit_kerja` VARCHAR(100) NOT NULL,
    `jenis_pelayanan` INTEGER NOT NULL DEFAULT 0,
    `kode_instalasi_bpjs` VARCHAR(10) NOT NULL,
    `status_antrian` INTEGER NOT NULL DEFAULT 0,
    `id_unit_induk` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_unit_kerja`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pegawai` INTEGER NOT NULL,
    `nama_user` VARCHAR(100) NOT NULL,
    `email_user` VARCHAR(100) NOT NULL,
    `hp_user` VARCHAR(20) NOT NULL,
    `password_user` TEXT NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL DEFAULT '0',
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_user_akses` (
    `id_akses` INTEGER NOT NULL AUTO_INCREMENT,
    `id_level` INTEGER NOT NULL,
    `id_menu` INTEGER NOT NULL,
    `hak_add` INTEGER NOT NULL,
    `hak_edit` INTEGER NOT NULL,
    `hak_delete` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL DEFAULT '0',
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_akses`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_user_level` (
    `id_level` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_level` VARCHAR(100) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL DEFAULT '0',
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_level`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_user_level_akses` (
    `id_user_level_akses` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_user` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_pegawai` INTEGER NOT NULL,
    `id_level` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL DEFAULT '0',
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_user_level_akses`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_agama` (
    `id_ms_agama` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_agama` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_agama`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_desa` (
    `id_ms_desa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_kecamatan` INTEGER NOT NULL,
    `nama_desa` INTEGER NOT NULL,
    `status_desa` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_desa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_golongan_darah` (
    `id_ms_golongan_darah` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_golongan_darah` VARCHAR(2) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_golongan_darah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jabatan` (
    `id_ms_jabatan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan` VARCHAR(200) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_jabatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jenis_pegawai` (
    `id_ms_jenis_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_jenis_pegawai_status` INTEGER NOT NULL,
    `nama_jenis_pegawai` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_jenis_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jenis_pegawai_status` (
    `id_ms_jenis_pegawai_status` INTEGER NOT NULL AUTO_INCREMENT,
    `status_jenis_pegawai` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_jenis_pegawai_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kecamatan` (
    `id_ms_kecamatan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_kota` INTEGER NOT NULL,
    `nama_kecamatan` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_kecamatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kota` (
    `id_ms_kota` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_provinsi` INTEGER NOT NULL,
    `nama_kota` INTEGER NOT NULL,
    `status_kota` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_kota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_loket_antrian` (
    `id_ms_loket_antrian` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_loket` INTEGER NOT NULL,
    `ket_loket` TEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_loket_antrian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_negara` (
    `id_ms_negara` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_negara` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_negara`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_pangkat` (
    `id_ms_pangkat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pangkat` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_pangkat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_provinsi` (
    `id_ms_provinsi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_negara` INTEGER NOT NULL,
    `nama_provinsi` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_provinsi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_spesialis` (
    `id_ms_spesialis` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_spesialis` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_spesialis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_kawin` (
    `id_ms_status_kawin` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_kawin` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_status_kawin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_pegawai` (
    `id_ms_status_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_pegawai` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_status_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_tingkat_pendidikan` (
    `id_ms_tingkat_pendidikan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_tingkat_pendidikan` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL,
    `created_by` CHAR(36) NOT NULL DEFAULT '0',
    `modified_at` DATETIME(0) NULL,
    `modified_by` CHAR(36) NULL,
    `deleted_at` DATETIME(0) NULL,
    `deleted_by` CHAR(36) NULL,
    `restored_at` DATETIME(0) NULL,
    `restored_by` CHAR(36) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `is_restored` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_ms_tingkat_pendidikan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
