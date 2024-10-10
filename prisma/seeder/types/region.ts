type Province = {
  id: string;
  nama: string;
  id_negara: number;
};

type Regency = {
  id: string;
  id_provinsi: string;
  nama: string;
};

type District = {
  id: string;
  id_kabkot: string;
  nama: string;
};

type Village = {
  id: string;
  id_kecamatan: string;
  nama: string;
};

type Country = {
  id: number;
  nama: string;
};

export type { Country, Province, Regency, District, Village };
