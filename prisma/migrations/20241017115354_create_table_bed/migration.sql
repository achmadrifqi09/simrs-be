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

-- CreateIndex
CREATE INDEX `ms_kamar_lantai_idx` ON `ms_kamar`(`lantai`);

-- CreateIndex
CREATE INDEX `ms_kamar_nama_kamar_idx` ON `ms_kamar`(`nama_kamar`);

-- AddForeignKey
ALTER TABLE `ms_kamar_bed` ADD CONSTRAINT `ms_kamar_bed_id_ms_kamar_fkey` FOREIGN KEY (`id_ms_kamar`) REFERENCES `ms_kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
