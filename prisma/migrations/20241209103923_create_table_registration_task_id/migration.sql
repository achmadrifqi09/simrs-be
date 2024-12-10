/*
  Warnings:

  - You are about to drop the column `task_id` on the `db_pendaftaran` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `db_pendaftaran` DROP COLUMN `task_id`,
    ADD COLUMN `kode_booking` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `db_pendaftaran_taskid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pendaftaran` INTEGER NOT NULL,
    `kode_task_id` INTEGER NOT NULL,
    `kode_booking` VARCHAR(191) NOT NULL,
    `tanggal_kirim` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `kode_reponse` INTEGER NOT NULL,
    `pesan_response` VARCHAR(191) NOT NULL,
    `response` LONGTEXT NOT NULL,
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

    INDEX `db_pendaftaran_taskid_id_pendaftaran_is_deleted_idx`(`id_pendaftaran`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `db_pendaftaran_taskid` ADD CONSTRAINT `db_pendaftaran_taskid_id_pendaftaran_fkey` FOREIGN KEY (`id_pendaftaran`) REFERENCES `db_pendaftaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
