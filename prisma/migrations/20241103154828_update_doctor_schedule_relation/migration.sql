-- AddForeignKey
ALTER TABLE `db_jadwal_dokter` ADD CONSTRAINT `db_jadwal_dokter_kode_instalasi_bpjs_fkey` FOREIGN KEY (`kode_instalasi_bpjs`) REFERENCES `db_unit_kerja`(`kode_instalasi_bpjs`) ON DELETE RESTRICT ON UPDATE CASCADE;
