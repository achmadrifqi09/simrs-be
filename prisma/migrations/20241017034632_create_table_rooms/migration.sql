-- AlterTable
ALTER TABLE `ms_status_keluarga` MODIFY `status` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ms_status_sosial` MODIFY `status` INTEGER NOT NULL DEFAULT 1;

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
    INDEX `ms_kamar_is_deleted_status_idx`(`is_deleted`, `status`),
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
    `id_kamar_kelas` INTEGER NOT NULL,
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

    INDEX `ms_jenis_kamar_id_kamar_kelas_idx`(`id_kamar_kelas`),
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

-- CreateIndex
CREATE INDEX `ms_status_keluarga_is_deleted_status_idx` ON `ms_status_keluarga`(`is_deleted`, `status`);

-- CreateIndex
CREATE INDEX `ms_status_sosial_is_deleted_status_idx` ON `ms_status_sosial`(`is_deleted`, `status`);

-- AddForeignKey
ALTER TABLE `ms_kamar` ADD CONSTRAINT `ms_kamar_id_ms_kamar_jenis_fkey` FOREIGN KEY (`id_ms_kamar_jenis`) REFERENCES `ms_jenis_kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_kamar` ADD CONSTRAINT `ms_kamar_id_gedung_fkey` FOREIGN KEY (`id_gedung`) REFERENCES `ms_gedung`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_jenis_kamar` ADD CONSTRAINT `ms_jenis_kamar_id_kamar_kelas_fkey` FOREIGN KEY (`id_kamar_kelas`) REFERENCES `ms_kelas_kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
