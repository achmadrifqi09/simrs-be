interface ProvPerujuk {
  kode: string;
  nama: string;
}

interface NoMR {
  noMR: string;
  noTelepon: string;
}

interface StatusPeserta {
  kode: string;
  keterangan: string;
}

interface ProvUmum {
  kdProvider: string;
  nmProvider: string;
}

interface JenisPeserta {
  kode: string;
  keterangan: string;
}

interface HakKelas {
  kode: string;
  keterangan: string;
}

interface Umur {
  umurSekarang: string;
  umurSaatPelayanan: string;
}

interface Informasi {
  dinsos: string | null;
  prolanisPRB: string | null;
  noSKTM: string | null;
  eSEP: string | null;
}

interface Cob {
  noAsuransi: string | null;
  nmAsuransi: string | null;
  tglTMT: string | null;
  tglTAT: string | null;
}

interface Peserta {
  noKartu: string;
  nik: string;
  nama: string;
  pisa: string;
  sex: string;
  mr: NoMR;
  tglLahir: string;
  tglCetakKartu: string;
  tglTAT: string;
  tglTMT: string;
  statusPeserta: StatusPeserta;
  provUmum: ProvUmum;
  jenisPeserta: JenisPeserta;
  hakKelas: HakKelas;
  umur: Umur;
  informasi: Informasi;
  cob: Cob;
}

interface Diagnosa {
  kode: string;
  nama: string;
}

interface PoliRujukan {
  kode: string;
  nama: string;
}

interface Pelayanan {
  kode: string;
  nama: string;
}

interface Rujukan {
  noKunjungan: string;
  tglKunjungan: string;
  provPerujuk: ProvPerujuk;
  peserta: Peserta;
  diagnosa: Diagnosa;
  keluhan: string;
  poliRujukan: PoliRujukan;
  pelayanan: Pelayanan;
}

export interface PatientReference {
  asalFaskes: string;
  rujukan: Rujukan;
}
