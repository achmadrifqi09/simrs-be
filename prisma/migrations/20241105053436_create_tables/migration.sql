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

    INDEX `db_client_nama_client_idx`(`nama_client`),
    INDEX `db_client_is_deleted_created_at_idx`(`is_deleted`, `created_at`),
    PRIMARY KEY (`client_id`)
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
    INDEX `db_user_id_pegawai_idx`(`id_pegawai`),
    INDEX `db_user_nama_user_idx`(`nama_user`),
    INDEX `db_user_hp_user_idx`(`hp_user`),
    INDEX `db_user_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `order` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `pathname` VARCHAR(191) NULL,
    `tag` VARCHAR(191) NOT NULL,
    `is_submenu` BOOLEAN NOT NULL,
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

    UNIQUE INDEX `db_menu_tag_key`(`tag`),
    INDEX `db_menu_parent_id_idx`(`parent_id`),
    INDEX `db_menu_pathname_idx`(`pathname`),
    INDEX `db_menu_tag_idx`(`tag`),
    INDEX `db_menu_is_deleted_idx`(`is_deleted`),
    INDEX `db_menu_is_submenu_order_idx`(`is_submenu`, `order`),
    INDEX `db_menu_status_is_deleted_order_idx`(`status`, `is_deleted`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_level_akses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
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

    INDEX `db_level_akses_nama_idx`(`nama`),
    INDEX `db_level_akses_status_idx`(`status`),
    INDEX `db_level_akses_is_deleted_idx`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_izin_level_akses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_level_akses` INTEGER NOT NULL,
    `id_menu` INTEGER NOT NULL,
    `can_view` BOOLEAN NOT NULL,
    `can_create` BOOLEAN NOT NULL,
    `can_update` BOOLEAN NOT NULL,
    `can_delete` BOOLEAN NOT NULL,
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

    INDEX `db_izin_level_akses_id_level_akses_id_menu_idx`(`id_level_akses`, `id_menu`),
    INDEX `db_izin_level_akses_is_deleted_idx`(`is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_akses_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_level_akses` INTEGER NOT NULL,
    `id_pegawai` INTEGER NOT NULL,
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

    INDEX `db_akses_user_id_user_idx`(`id_user`),
    INDEX `db_akses_user_id_level_akses_idx`(`id_level_akses`),
    INDEX `db_akses_user_id_pegawai_idx`(`id_pegawai`),
    INDEX `db_akses_user_is_deleted_idx`(`is_deleted`),
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

    INDEX `db_pasien_nama_pasien_idx`(`nama_pasien`),
    INDEX `db_pasien_no_identitas_idx`(`no_identitas`),
    INDEX `db_pasien_no_bpjs_idx`(`no_bpjs`),
    INDEX `db_pasien_hp_idx`(`hp`),
    INDEX `db_pasien_id_ms_provinsi_tinggal_id_ms_kota_tinggal_idx`(`id_ms_provinsi_tinggal`, `id_ms_kota_tinggal`),
    INDEX `db_pasien_id_ms_kota_tinggal_id_ms_kecamatan_tinggal_idx`(`id_ms_kota_tinggal`, `id_ms_kecamatan_tinggal`),
    INDEX `db_pasien_tgl_lahir_jenis_kelamin_idx`(`tgl_lahir`, `jenis_kelamin`),
    INDEX `db_pasien_is_deleted_created_at_idx`(`is_deleted`, `created_at`),
    PRIMARY KEY (`id_pasien`, `kode_rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_pegawai` (
    `id_pegawai` INTEGER NOT NULL AUTO_INCREMENT,
    `no_reg` VARCHAR(50) NOT NULL,
    `nip_pegawai` VARCHAR(50) NULL,
    `nip_pns` VARCHAR(50) NULL,
    `gelar_depan` VARCHAR(100) NULL,
    `gelar_belakang` VARCHAR(100) NULL,
    `nama_pegawai` VARCHAR(100) NOT NULL,
    `id_ms_negara_asal` INTEGER NOT NULL,
    `id_ms_provinsi_asal` VARCHAR(191) NOT NULL,
    `id_ms_kota_asal` VARCHAR(191) NOT NULL,
    `id_ms_kecamatan_asal` VARCHAR(191) NOT NULL,
    `id_ms_desa_asal` VARCHAR(191) NOT NULL,
    `alamat_asal` TEXT NULL,
    `kode_pos_asal` VARCHAR(10) NULL,
    `rt_asal` VARCHAR(5) NULL,
    `rw_asal` VARCHAR(5) NULL,
    `id_ms_negara_tinggal` INTEGER NOT NULL,
    `id_ms_provinsi_tinggal` VARCHAR(191) NOT NULL,
    `id_ms_kota_tinggal` VARCHAR(191) NOT NULL,
    `id_ms_kecamatan_tinggal` VARCHAR(191) NOT NULL,
    `id_ms_desa_tinggal` VARCHAR(191) NOT NULL,
    `alamat_tinggal` TEXT NOT NULL,
    `kode_pos_tinggal` VARCHAR(10) NOT NULL,
    `rt_tinggal` VARCHAR(3) NOT NULL,
    `rw_tinggal` VARCHAR(3) NOT NULL,
    `tempat_lahir` VARCHAR(100) NOT NULL,
    `tgl_lahir` DATE NOT NULL,
    `id_jenis_kelamin` INTEGER NOT NULL,
    `id_ms_golongan_darah` INTEGER NULL,
    `id_ms_status_kawin` INTEGER NOT NULL,
    `id_ms_agama` INTEGER NOT NULL,
    `id_ms_pendidikan` INTEGER NOT NULL,
    `id_ms_jenis_pegawai` INTEGER NOT NULL,
    `id_ms_status_pegawai` INTEGER NOT NULL,
    `id_ms_spesialis` INTEGER NULL,
    `id_unit_induk` INTEGER NOT NULL,
    `id_pangkat` INTEGER NOT NULL,
    `id_jabatan` INTEGER NOT NULL,
    `id_unit_jabatan` INTEGER NOT NULL,
    `id_gaji` INTEGER NULL,
    `pjs` INTEGER NULL,
    `hp` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `no_npwp` VARCHAR(25) NOT NULL,
    `no_ktp` VARCHAR(25) NOT NULL,
    `no_ktam` VARCHAR(25) NOT NULL,
    `foto` TEXT NULL,
    `kode_arsip` VARCHAR(20) NULL,
    `id_finger` VARCHAR(10) NOT NULL,
    `kode_dpjp` VARCHAR(20) NULL,
    `tgl_masuk` DATE NOT NULL,
    `tgl_keluar` DATE NULL,
    `status_pns` INTEGER NOT NULL,
    `status_aktif` INTEGER NOT NULL,
    `id_pelamar` INTEGER NULL,
    `file_ktp` TEXT NULL,
    `file_kk` TEXT NULL,
    `file_ktam` TEXT NULL,
    `file_npwp` TEXT NULL,
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

    INDEX `db_pegawai_id_pegawai_idx`(`id_pegawai`),
    INDEX `id_status_kawin`(`id_ms_status_kawin`),
    INDEX `db_pegawai_nama_pegawai_idx`(`nama_pegawai`),
    INDEX `db_pegawai_nip_pegawai_idx`(`nip_pegawai`),
    INDEX `db_pegawai_nip_pns_idx`(`nip_pns`),
    INDEX `db_pegawai_id_ms_negara_asal_idx`(`id_ms_negara_asal`),
    INDEX `db_pegawai_id_ms_negara_tinggal_idx`(`id_ms_negara_tinggal`),
    INDEX `db_pegawai_id_ms_provinsi_asal_idx`(`id_ms_provinsi_asal`),
    INDEX `db_pegawai_id_ms_provinsi_tinggal_idx`(`id_ms_provinsi_tinggal`),
    INDEX `db_pegawai_id_ms_kota_asal_idx`(`id_ms_kota_asal`),
    INDEX `db_pegawai_id_ms_kota_tinggal_idx`(`id_ms_kota_tinggal`),
    INDEX `db_pegawai_id_ms_kecamatan_asal_idx`(`id_ms_kecamatan_asal`),
    INDEX `db_pegawai_id_ms_kecamatan_tinggal_idx`(`id_ms_kecamatan_tinggal`),
    INDEX `db_pegawai_id_ms_desa_asal_idx`(`id_ms_desa_asal`),
    INDEX `db_pegawai_id_ms_desa_tinggal_idx`(`id_ms_desa_tinggal`),
    INDEX `db_pegawai_no_ktp_idx`(`no_ktp`),
    INDEX `db_pegawai_email_idx`(`email`),
    INDEX `db_pegawai_hp_idx`(`hp`),
    INDEX `db_pegawai_id_jabatan_idx`(`id_jabatan`),
    INDEX `db_pegawai_status_aktif_is_deleted_idx`(`status_aktif`, `is_deleted`),
    INDEX `db_pegawai_id_ms_jenis_pegawai_status_aktif_idx`(`id_ms_jenis_pegawai`, `status_aktif`),
    PRIMARY KEY (`id_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_unit_kerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_unit_kerja` VARCHAR(100) NOT NULL,
    `jenis_pelayanan` INTEGER NOT NULL DEFAULT 0,
    `kode_instalasi_bpjs` VARCHAR(10) NULL,
    `status_antrian` INTEGER NOT NULL DEFAULT 0,
    `is_parent_unit` INTEGER NOT NULL DEFAULT 0,
    `id_unit_induk` INTEGER NULL,
    `id_bidang` INTEGER NULL,
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

    UNIQUE INDEX `db_unit_kerja_kode_instalasi_bpjs_key`(`kode_instalasi_bpjs`),
    INDEX `db_unit_kerja_nama_unit_kerja_idx`(`nama_unit_kerja`),
    INDEX `db_unit_kerja_kode_instalasi_bpjs_idx`(`kode_instalasi_bpjs`),
    INDEX `db_unit_kerja_id_unit_induk_idx`(`id_unit_induk`),
    INDEX `db_unit_kerja_id_bidang_idx`(`id_bidang`),
    INDEX `db_unit_kerja_status_is_deleted_idx`(`status`, `is_deleted`),
    INDEX `db_unit_kerja_jenis_pelayanan_status_idx`(`jenis_pelayanan`, `status`),
    INDEX `db_unit_kerja_jenis_pelayanan_status_antrian_idx`(`jenis_pelayanan`, `status_antrian`),
    INDEX `idx_parent_child_relation`(`id`, `id_unit_induk`),
    INDEX `idx_active_children`(`id_unit_induk`, `is_deleted`),
    INDEX `db_unit_kerja_created_at_idx`(`created_at`),
    INDEX `db_unit_kerja_modified_at_idx`(`modified_at`),
    INDEX `db_unit_kerja_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_bidang_unit_kerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bidang` VARCHAR(191) NOT NULL,
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

    INDEX `db_bidang_unit_kerja_nama_bidang_idx`(`nama_bidang`),
    INDEX `db_bidang_unit_kerja_status_is_deleted_idx`(`status`, `is_deleted`),
    INDEX `db_bidang_unit_kerja_created_at_idx`(`created_at`),
    INDEX `db_bidang_unit_kerja_modified_at_idx`(`modified_at`),
    INDEX `db_bidang_unit_kerja_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
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

    INDEX `ms_agama_nama_agama_idx`(`nama_agama`),
    INDEX `ms_agama_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_golongan_darah_nama_golongan_darah_idx`(`nama_golongan_darah`),
    INDEX `ms_golongan_darah_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_jabatan_nama_jabatan_idx`(`nama_jabatan`),
    INDEX `ms_jabatan_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_jenis_pegawai_nama_jenis_pegawai_idx`(`nama_jenis_pegawai`),
    INDEX `ms_jenis_pegawai_id_ms_jenis_pegawai_status_idx`(`id_ms_jenis_pegawai_status`),
    INDEX `ms_jenis_pegawai_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id_ms_jenis_pegawai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jenis_pegawai_status` (
    `id_ms_jenis_pegawai_status` INTEGER NOT NULL AUTO_INCREMENT,
    `status_jenis_pegawai` VARCHAR(100) NOT NULL,
    `kode_nip` VARCHAR(2) NOT NULL,
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

    INDEX `ms_jenis_pegawai_status_status_jenis_pegawai_idx`(`status_jenis_pegawai`),
    INDEX `ms_jenis_pegawai_status_kode_nip_idx`(`kode_nip`),
    INDEX `ms_jenis_pegawai_status_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id_ms_jenis_pegawai_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_loket_antrian` (
    `id_ms_loket_antrian` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_loket` VARCHAR(191) NOT NULL,
    `keterangan` TEXT NULL,
    `jenis_loket` TINYINT NOT NULL,
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

    INDEX `ms_loket_antrian_nama_loket_idx`(`nama_loket`),
    INDEX `ms_loket_antrian_status_is_deleted_jenis_loket_idx`(`status`, `is_deleted`, `jenis_loket`),
    INDEX `ms_loket_antrian_status_is_deleted_idx`(`status`, `is_deleted`),
    INDEX `ms_loket_antrian_jenis_loket_idx`(`jenis_loket`),
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

    INDEX `ms_pangkat_nama_pangkat_idx`(`nama_pangkat`),
    INDEX `ms_pangkat_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_spesialis_nama_spesialis_idx`(`nama_spesialis`),
    INDEX `ms_spesialis_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_status_kawin_nama_status_kawin_idx`(`nama_status_kawin`),
    INDEX `ms_status_kawin_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_status_pegawai_nama_status_pegawai_idx`(`nama_status_pegawai`),
    INDEX `ms_status_pegawai_status_is_deleted_idx`(`status`, `is_deleted`),
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

    INDEX `ms_tingkat_pendidikan_nama_tingkat_pendidikan_idx`(`nama_tingkat_pendidikan`),
    INDEX `ms_tingkat_pendidikan_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id_ms_tingkat_pendidikan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_antrian` (
    `id_antrian` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_pasien` INTEGER NOT NULL,
    `jenis_penjamin` INTEGER NOT NULL,
    `kode_poliklinik` VARCHAR(191) NULL,
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

    INDEX `db_antrian_kode_rm_idx`(`kode_rm`),
    INDEX `db_antrian_nama_pasien_idx`(`nama_pasien`),
    INDEX `db_antrian_no_bpjs_idx`(`no_bpjs`),
    INDEX `db_antrian_id_jadwal_dokter_idx`(`id_jadwal_dokter`),
    INDEX `db_antrian_tgl_panggil_status_panggil_idx`(`tgl_panggil`, `status_panggil`),
    INDEX `db_antrian_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id_antrian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_jadwal_dokter` (
    `id_jadwal_dokter` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pegawai` INTEGER NOT NULL,
    `kode_instalasi_bpjs` VARCHAR(191) NOT NULL,
    `jenis_jadwal` INTEGER NOT NULL DEFAULT 1,
    `hari_praktek` INTEGER NULL,
    `tgl_praktek` DATE NULL,
    `jam_buka_praktek` TIME(0) NOT NULL,
    `jam_tutup_praktek` TIME(0) NOT NULL,
    `kuota_mjkn` INTEGER NOT NULL,
    `kuota_online_umum` INTEGER NOT NULL,
    `kuota_onsite` INTEGER NOT NULL,
    `tanggal_libur` DATE NULL,
    `keterangan_libur` VARCHAR(191) NULL,
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

    INDEX `db_jadwal_dokter_id_pegawai_idx`(`id_pegawai`),
    INDEX `db_jadwal_dokter_jenis_jadwal_idx`(`jenis_jadwal`),
    INDEX `db_jadwal_dokter_kode_instalasi_bpjs_idx`(`kode_instalasi_bpjs`),
    INDEX `db_jadwal_dokter_tgl_praktek_hari_praktek_idx`(`tgl_praktek`, `hari_praktek`),
    INDEX `db_jadwal_dokter_id_pegawai_kode_instalasi_bpjs_idx`(`id_pegawai`, `kode_instalasi_bpjs`),
    INDEX `db_jadwal_dokter_tgl_praktek_jenis_jadwal_is_deleted_idx`(`tgl_praktek`, `jenis_jadwal`, `is_deleted`),
    INDEX `db_jadwal_dokter_hari_praktek_jenis_jadwal_is_deleted_idx`(`hari_praktek`, `jenis_jadwal`, `is_deleted`),
    PRIMARY KEY (`id_jadwal_dokter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `db_kuota_tambahan_jadwal_dokter` (
    `id_kuota_tambahan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_jadwal_dokter` INTEGER NULL,
    `kuota_mjkn` INTEGER NOT NULL,
    `kuota_online_umum` INTEGER NOT NULL,
    `kuota_onsite` INTEGER NOT NULL,
    `tanggal_diterapkan` DATE NULL,
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

    INDEX `db_kuota_tambahan_jadwal_dokter_id_jadwal_dokter_idx`(`id_jadwal_dokter`),
    INDEX `db_kuota_tambahan_jadwal_dokter_id_kuota_tambahan_idx`(`id_kuota_tambahan`),
    PRIMARY KEY (`id_kuota_tambahan`)
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
    INDEX `idx_country_status`(`status`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_keluarga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_keluarga` VARCHAR(191) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
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

    INDEX `ms_status_keluarga_nama_status_keluarga_idx`(`nama_status_keluarga`),
    INDEX `ms_status_keluarga_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_sosial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_sosial` VARCHAR(191) NOT NULL,
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

    INDEX `ms_status_sosial_nama_status_sosial_idx`(`nama_status_sosial`),
    INDEX `ms_status_sosial_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_kamar_jenis` INTEGER NOT NULL,
    `id_gedung` INTEGER NOT NULL,
    `lantai` INTEGER NOT NULL,
    `nama_kamar` VARCHAR(50) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
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

    INDEX `ms_kamar_id_ms_kamar_jenis_idx`(`id_ms_kamar_jenis`),
    INDEX `ms_kamar_id_gedung_idx`(`id_gedung`),
    INDEX `ms_kamar_lantai_idx`(`lantai`),
    INDEX `ms_kamar_nama_kamar_idx`(`nama_kamar`),
    INDEX `ms_kamar_status_is_deleted_idx`(`status`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kamar_bed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ms_kamar` INTEGER NOT NULL,
    `nama_bed` VARCHAR(50) NOT NULL,
    `keterangan` TEXT NOT NULL,
    `status_bed` INTEGER NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
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

    INDEX `ms_kamar_bed_id_ms_kamar_idx`(`id_ms_kamar`),
    INDEX `ms_kamar_bed_nama_bed_idx`(`nama_bed`),
    INDEX `ms_kamar_bed_status_bed_status_idx`(`status_bed`, `status`),
    INDEX `ms_kamar_bed_is_deleted_status_idx`(`is_deleted`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_gedung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_gedung` VARCHAR(191) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
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

    INDEX `ms_gedung_is_deleted_status_idx`(`is_deleted`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_jenis_kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jenis_kamar` VARCHAR(191) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `id_kelas_kamar` INTEGER NOT NULL,
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

    INDEX `ms_jenis_kamar_id_kelas_kamar_idx`(`id_kelas_kamar`),
    INDEX `ms_jenis_kamar_is_deleted_status_idx`(`is_deleted`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_kelas_kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kelas_kamar` VARCHAR(50) NOT NULL,
    `kode_bpjs_kamar` VARCHAR(10) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
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

    INDEX `ms_kelas_kamar_is_deleted_status_idx`(`is_deleted`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `db_menu` ADD CONSTRAINT `db_menu_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `db_menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_level_akses` ADD CONSTRAINT `db_izin_level_akses_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `db_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_izin_level_akses` ADD CONSTRAINT `db_izin_level_akses_id_level_akses_fkey` FOREIGN KEY (`id_level_akses`) REFERENCES `db_level_akses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_akses_user` ADD CONSTRAINT `db_akses_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `db_user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_akses_user` ADD CONSTRAINT `db_akses_user_id_level_akses_fkey` FOREIGN KEY (`id_level_akses`) REFERENCES `db_level_akses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_negara_asal_fkey` FOREIGN KEY (`id_ms_negara_asal`) REFERENCES `ms_negara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_provinsi_asal_fkey` FOREIGN KEY (`id_ms_provinsi_asal`) REFERENCES `ms_provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kota_asal_fkey` FOREIGN KEY (`id_ms_kota_asal`) REFERENCES `ms_kabkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kecamatan_asal_fkey` FOREIGN KEY (`id_ms_kecamatan_asal`) REFERENCES `ms_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_desa_asal_fkey` FOREIGN KEY (`id_ms_desa_asal`) REFERENCES `ms_desa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_negara_tinggal_fkey` FOREIGN KEY (`id_ms_negara_tinggal`) REFERENCES `ms_negara`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_provinsi_tinggal_fkey` FOREIGN KEY (`id_ms_provinsi_tinggal`) REFERENCES `ms_provinsi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kota_tinggal_fkey` FOREIGN KEY (`id_ms_kota_tinggal`) REFERENCES `ms_kabkot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_kecamatan_tinggal_fkey` FOREIGN KEY (`id_ms_kecamatan_tinggal`) REFERENCES `ms_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_desa_tinggal_fkey` FOREIGN KEY (`id_ms_desa_tinggal`) REFERENCES `ms_desa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_unit_kerja` ADD CONSTRAINT `db_unit_kerja_id_unit_induk_fkey` FOREIGN KEY (`id_unit_induk`) REFERENCES `db_unit_kerja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_unit_kerja` ADD CONSTRAINT `db_unit_kerja_id_bidang_fkey` FOREIGN KEY (`id_bidang`) REFERENCES `db_bidang_unit_kerja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_jenis_pegawai` ADD CONSTRAINT `ms_jenis_pegawai_id_ms_jenis_pegawai_status_fkey` FOREIGN KEY (`id_ms_jenis_pegawai_status`) REFERENCES `ms_jenis_pegawai_status`(`id_ms_jenis_pegawai_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_antrian` ADD CONSTRAINT `db_antrian_kode_poliklinik_fkey` FOREIGN KEY (`kode_poliklinik`) REFERENCES `db_unit_kerja`(`kode_instalasi_bpjs`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_jadwal_dokter` ADD CONSTRAINT `db_jadwal_dokter_id_pegawai_fkey` FOREIGN KEY (`id_pegawai`) REFERENCES `db_pegawai`(`id_pegawai`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_jadwal_dokter` ADD CONSTRAINT `db_jadwal_dokter_kode_instalasi_bpjs_fkey` FOREIGN KEY (`kode_instalasi_bpjs`) REFERENCES `db_unit_kerja`(`kode_instalasi_bpjs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `db_kuota_tambahan_jadwal_dokter` ADD CONSTRAINT `db_kuota_tambahan_jadwal_dokter_id_jadwal_dokter_fkey` FOREIGN KEY (`id_jadwal_dokter`) REFERENCES `db_jadwal_dokter`(`id_jadwal_dokter`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_desa` ADD CONSTRAINT `fk_kecamatan` FOREIGN KEY (`id_kecamatan`) REFERENCES `ms_kecamatan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_kabkot` ADD CONSTRAINT `fk_provinsi` FOREIGN KEY (`id_provinsi`) REFERENCES `ms_provinsi`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_kecamatan` ADD CONSTRAINT `fk_kabkot` FOREIGN KEY (`id_kabkot`) REFERENCES `ms_kabkot`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_provinsi` ADD CONSTRAINT `fk_negara` FOREIGN KEY (`id_negara`) REFERENCES `ms_negara`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ms_kamar` ADD CONSTRAINT `ms_kamar_id_ms_kamar_jenis_fkey` FOREIGN KEY (`id_ms_kamar_jenis`) REFERENCES `ms_jenis_kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_kamar` ADD CONSTRAINT `ms_kamar_id_gedung_fkey` FOREIGN KEY (`id_gedung`) REFERENCES `ms_gedung`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_kamar_bed` ADD CONSTRAINT `ms_kamar_bed_id_ms_kamar_fkey` FOREIGN KEY (`id_ms_kamar`) REFERENCES `ms_kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_jenis_kamar` ADD CONSTRAINT `ms_jenis_kamar_id_kelas_kamar_fkey` FOREIGN KEY (`id_kelas_kamar`) REFERENCES `ms_kelas_kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
