-- CreateTable
CREATE TABLE `ms_status_keluarga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_keluarga` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_status_sosial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_status_sosial` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
