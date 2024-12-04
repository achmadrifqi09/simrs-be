-- AlterTable
ALTER TABLE `db_biaya_pendaftaran` MODIFY `diskon_daftar` VARCHAR(20) NOT NULL DEFAULT '0',
    MODIFY `diskon_kartu` VARCHAR(20) NOT NULL DEFAULT '0',
    MODIFY `diskon_dokter` VARCHAR(20) NOT NULL DEFAULT '0',
    MODIFY `tgl_billing_daftar_selesai` DATETIME(3) NULL;
