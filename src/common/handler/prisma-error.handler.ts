import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaErrorHandler {
  static handle(error: any) {
    switch (error.code) {
      case 'P2025':
        throw new HttpException(
          'Data terkait tidak ditemukan',
          HttpStatus.NOT_FOUND,
        );
      case 'P2002':
        throw new HttpException(
          'Anda memasukkan kode unik yang sama dengan data lain',
          HttpStatus.CONFLICT,
        );
      case 'P2003':
        throw new HttpException(
          'Data masih memiliki relasi lain',
          HttpStatus.CONFLICT,
        );
      case 'P2004':
        throw new HttpException('Transaksi data gagal', HttpStatus.BAD_REQUEST);
      case 'P2016':
        throw new HttpException(
          'Model data tidak ada dalam database',
          HttpStatus.NOT_FOUND,
        );
      case 'P2000':
        throw new HttpException(
          'Nilai terlalu panjang untuk bidang tersebut',
          HttpStatus.BAD_REQUEST,
        );
      default:
        throw new HttpException(
          'Terjadi kesalahan tak terduga',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
