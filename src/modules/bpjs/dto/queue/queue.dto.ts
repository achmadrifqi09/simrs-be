export interface BPJSQueueDto {
  kodebooking?: string;
  jenispasien: string;
  nomorkartu: string | null;
  nik: string;
  nohp: string;
  kodepoli: string;
  namapoli: string;
  pasienbaru: number;
  norm: string;
  tanggalperiksa: string;
  kodedokter: number;
  namadokter: string;
  jampraktek: string;
  jeniskunjungan: number;
  nomorreferensi: string;
  nomorantrean: string;
  angkaantrean: number;
  estimasidilayani: number;
  sisakuotajkn: number;
  kuotajkn: number;
  sisakuotanonjkn: number;
  kuotanonjkn: number;
  keterangan: string;
}

export interface BPJSQueueInputPayloadDto {
  idantrian: number;
  idpendaftaran: number;
  kodebooking: string;
  jenispasien: string;
  nomorkartu: string | null | undefined;
  nik: string;
  nohp: string;
  kodepoli: string;
  namapoli: string;
  pasienbaru: number;
  norm: string;
  tanggalperiksa: string;
  kodedokter: number;
  namadokter: string;
  jampraktek: string;
  jeniskunjungan: number;
  nomorreferensi: string | null | undefined;
  nomorantrean: string;
  angkaantrean: number;
  estimasidilayani: number;
  sisakuotajkn: number;
  kuotajkn: number;
  sisakuotanonjkn: number;
  kuotanonjkn: number;
  keterangan: string;
}

export interface DoctorQuotaFilled {
  total_mjkn: number;
  total_non_mjkn: number;
}

export interface QueueCancellationDto {
  kodebooking: string;
  keterangan: string;
}
