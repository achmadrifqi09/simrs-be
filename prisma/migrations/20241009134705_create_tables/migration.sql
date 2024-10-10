-- CreateTable
CREATE TABLE `db_client` (
    `client_id` VARCHAR(191) NOT NULL,
    `client_secret` VARCHAR(191) NOT NULL,
    `nama_client` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(100) NOT NULL,
    `order` INTEGER NOT NULL,
    `icon` VARCHAR(100) NULL,
    `pathname` VARCHAR(100) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `is_submenu` BOOLEAN NULL DEFAULT false,
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

    UNIQUE INDEX `db_menu_order_key`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_submenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `pathname` VARCHAR(191) NOT NULL,
    `id_menu` INTEGER NOT NULL,
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

    INDEX `db_submenu_id_menu_idx`(`id_menu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_izin_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `id_menu` INTEGER NOT NULL,
    `is_create` BOOLEAN NOT NULL,
    `is_update` BOOLEAN NOT NULL,
    `is_delete` BOOLEAN NOT NULL,
    `is_view` BOOLEAN NOT NULL,
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

    INDEX `db_izin_menu_id_menu_idx`(`id_menu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_izin_submenu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_izin_menu` INTEGER NOT NULL,
    `id_submenu` INTEGER NOT NULL,
    `is_create` BOOLEAN NOT NULL,
    `is_update` BOOLEAN NOT NULL,
    `is_delete` BOOLEAN NOT NULL,
    `is_view` BOOLEAN NOT NULL,
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

    INDEX `db_izin_submenu_id_izin_menu_id_submenu_idx`(`id_izin_menu`, `id_submenu`),
    INDEX `db_izin_submenu_id_submenu_fkey`(`id_submenu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_izin_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_izin_menu` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
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

    INDEX `db_izin_user_id_user_id_izin_menu_idx`(`id_user`, `id_izin_menu`),
    INDEX `db_izin_user_id_izin_menu_fkey`(`id_izin_menu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_pasien` (
    `id_pasien` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_rm` VARCHAR(20) NOT NULL DEFAULT '',
    `nama_pasien` VARCHAR(100) NOT NULL,
    `tempat_lahir` VARCHAR(100) NOT NULL,
    `tgl_lahir` DATE NOT NULL,
    `jenis_kelamin` INTEGER NOT NULL,
    `id_warga_negara` INTEGER NOT NULL,
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
    `status` BOOLEAN NOT NULL DEFAULT true,
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

    UNIQUE INDEX `db_user_email_user_key`(`email_user`),
    INDEX `db_user_email_user_idx`(`email_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_agama` (
    `id_ms_agama` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_agama` VARCHAR(50) NOT NULL,
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

    PRIMARY KEY (`id_ms_agama`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_golongan_darah` (
    `id_ms_golongan_darah` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_golongan_darah` VARCHAR(2) NOT NULL,
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

    PRIMARY KEY (`id_ms_golongan_darah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jabatan` (
    `id_ms_jabatan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan` VARCHAR(200) NOT NULL,
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

    PRIMARY KEY (`id_ms_jabatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jenis_pegawai` (
    `id_ms_jenis_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_jenis_pegawai_status` INTEGER NOT NULL,
    `nama_jenis_pegawai` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`id_ms_jenis_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jenis_pegawai_status` (
    `id_ms_jenis_pegawai_status` INTEGER NOT NULL AUTO_INCREMENT,
    `status_jenis_pegawai` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`id_ms_jenis_pegawai_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_loket_antrian` (
    `id_ms_loket_antrian` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_loket` INTEGER NOT NULL,
    `ket_loket` TEXT NOT NULL,
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

    PRIMARY KEY (`id_ms_loket_antrian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_pangkat` (
    `id_ms_pangkat` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pangkat` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`id_ms_pangkat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_spesialis` (
    `id_ms_spesialis` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_spesialis` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`id_ms_spesialis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_kawin` (
    `id_ms_status_kawin` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_kawin` VARCHAR(50) NOT NULL,
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

    PRIMARY KEY (`id_ms_status_kawin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_pegawai` (
    `id_ms_status_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_pegawai` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`id_ms_status_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_tingkat_pendidikan` (
    `id_ms_tingkat_pendidikan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_tingkat_pendidikan` VARCHAR(100) NOT NULL,
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

    PRIMARY KEY (`id_ms_tingkat_pendidikan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_antrian` (
    `id_antrian` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_pasien` INTEGER NOT NULL,
    `jenis_penjamin` INTEGER NOT NULL,
    `kode_rm` VARCHAR(20) NOT NULL,
    `nama_pasien` VARCHAR(100) NOT NULL,
    `tgl_lahir` DATE NOT NULL,
    `hp` VARCHAR(20) NOT NULL,
    `no_bpjs` VARCHAR(50) NOT NULL,
    `kode_antrian` VARCHAR(1) NOT NULL,
    `no_antrian` INTEGER NOT NULL,
    `id_jadwal_dokter` INTEGER NOT NULL,
    `tgl_panggil` DATETIME(0) NOT NULL,
    `id_ms_loket_antrian` INTEGER NOT NULL,
    `status_panggil` INTEGER NOT NULL,
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

    PRIMARY KEY (`id_antrian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_jadwal_dokter` (
    `id_jadwal_dokter` INTEGER NOT NULL AUTO_INCREMENT,
    `id_hari` INTEGER NOT NULL,
    `tgl_praktek` DATE NOT NULL,
    `id_pegawai` INTEGER NOT NULL,
    `id_unit_kerja` INTEGER NOT NULL,
    `jam_awal_prakter` TIME(0) NOT NULL,
    `jam_akhir_praktek` TIME(0) NOT NULL,
    `online_bpjs_mjkn` INTEGER NOT NULL,
    `online_umum` INTEGER NOT NULL,
    `onsite_bpjs` INTEGER NOT NULL,
    `onsite_umum` INTEGER NOT NULL,
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

    PRIMARY KEY (`id_jadwal_dokter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_jadwal_dokter_ganti` (
    `id_jadwal_dokter_ganti` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jadwal_dokter` INTEGER NOT NULL,
    `tgl_praktek` DATE NOT NULL,
    `id_pegawai` INTEGER NOT NULL,
    `id_unit_kerja` INTEGER NOT NULL,
    `jam_awal_prakter` TIME(0) NOT NULL,
    `jam_akhir_praktek` TIME(0) NOT NULL,
    `online_bpjs_mjkn` INTEGER NOT NULL,
    `online_umum` INTEGER NOT NULL,
    `onsite_bpjs` INTEGER NOT NULL,
    `onsite_umum` INTEGER NOT NULL,
    `keterangan_ganti` TEXT NOT NULL,
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

    PRIMARY KEY (`id_jadwal_dokter_ganti`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_desa` (
    `id` CHAR(10) NOT NULL,
    `id_kecamatan` CHAR(6) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
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

    INDEX `fk_kecamatan`(`id_kecamatan`),
    INDEX `idx_village_nama`(`nama`),
    INDEX `idx_village_is_deleted`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kabkot` (
    `id` CHAR(4) NOT NULL,
    `id_provinsi` CHAR(2) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
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

    INDEX `fk_provinsi`(`id_provinsi`),
    INDEX `idx_regency_nama`(`nama`),
    INDEX `idx_regency_is_deleted`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kecamatan` (
    `id` CHAR(6) NOT NULL,
    `id_kabkot` CHAR(4) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
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

    INDEX `fk_kabkot`(`id_kabkot`),
    INDEX `idx_district_nama`(`nama`),
    INDEX `idx_district_is_deleted`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_provinsi` (
    `id` CHAR(2) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `id_negara` INTEGER NOT NULL,
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

    INDEX `fk_negara`(`id_negara`),
    INDEX `idx_province_nama`(`nama`),
    INDEX `idx_province_is_deleted`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_negara` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
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

    INDEX `idx_country_nama`(`nama`),
    INDEX `idx_country_is_deleted`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `db_submenu` ADD CONSTRAINT `db_submenu_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `db_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_menu` ADD CONSTRAINT `db_izin_menu_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `db_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_submenu` ADD CONSTRAINT `db_izin_submenu_id_izin_menu_fkey` FOREIGN KEY (`id_izin_menu`) REFERENCES `db_izin_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_submenu` ADD CONSTRAINT `db_izin_submenu_id_submenu_fkey` FOREIGN KEY (`id_submenu`) REFERENCES `db_submenu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_user` ADD CONSTRAINT `db_izin_user_id_izin_menu_fkey` FOREIGN KEY (`id_izin_menu`) REFERENCES `db_izin_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_user` ADD CONSTRAINT `db_izin_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `db_user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_desa` ADD CONSTRAINT `fk_kecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `ms_kecamatan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_kabkot` ADD CONSTRAINT `fk_provinsi` FOREIGN KEY (`id_provinsi`) REFERENCES `ms_provinsi`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_kecamatan` ADD CONSTRAINT `fk_kabkot` FOREIGN KEY (`id_kabkot`) REFERENCES `ms_kabkot`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_provinsi` ADD CONSTRAINT `fk_negara` FOREIGN KEY (`id_negara`) REFERENCES `ms_negara`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
