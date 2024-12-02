-- DropForeignKey
ALTER TABLE `db_pegawai` DROP FOREIGN KEY `db_pegawai_id_ms_negara_asal_fkey`;

-- AlterTable
ALTER TABLE `db_pegawai` MODIFY `id_ms_negara_asal` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `db_pegawai` ADD CONSTRAINT `db_pegawai_id_ms_negara_asal_fkey` FOREIGN KEY (`id_ms_negara_asal`) REFERENCES `ms_negara`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
