import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationFeeRepository } from '../repository/registration-fee.repository';
import { RegistrationFee } from '../dto/registration-fee.dto';
import { generateCurrentDate } from 'src/utils/date-formatter';

@Injectable()
export class RegistrationFeeService {
  constructor(
    private readonly registrationFeeRepository: RegistrationFeeRepository,
  ) {}

  async createRegistrationFee(registrationFee: RegistrationFee, req: any) {
    const existingRegistrationFee =
      await this.registrationFeeRepository.findRegistrationFeeByRegistrationId(
        Number(registrationFee.id_pendaftaran),
      );

    if (existingRegistrationFee) {
      throw new HttpException(
        'Data pendaftaran terkait sudah memiliki rincian biaya',
        HttpStatus.BAD_REQUEST,
      );
    }
    const totalFee = this.calculateTotalFee(registrationFee);

    registrationFee.created_at = generateCurrentDate();
    registrationFee.created_by = req?.user?.id || 0;
    registrationFee.total_biaya = totalFee;
    registrationFee.tgl_billing_daftar = generateCurrentDate();

    return await this.registrationFeeRepository.createRegistrationFee(
      registrationFee,
    );
  }

  async updateRegistrationFee(
    id: number,
    registrationFee: RegistrationFee,
    req: any,
  ) {
    const totalFee = this.calculateTotalFee(registrationFee);

    registrationFee.modified_at = generateCurrentDate();
    registrationFee.modified_by = req?.user?.id || 0;
    registrationFee.total_biaya = totalFee;
    registrationFee.tgl_billing_daftar = generateCurrentDate();

    return await this.registrationFeeRepository.updateRegistrationFee(
      id,
      registrationFee,
    );
  }

  private calculateTotalFee(registrationFee: RegistrationFee): string {
    const {
      biaya_daftar,
      biaya_kartu,
      biaya_dokter,
      diskon_daftar,
      diskon_kartu,
      diskon_dokter,
    } = registrationFee;

    let totalFee =
      Number(biaya_daftar) + Number(biaya_kartu) + Number(biaya_dokter);

    const calculatePriceWithDiscount = (
      fee: number,
      discountPercentage: string | undefined,
    ): number => {
      if (!discountPercentage) return fee;
      const discount = Number(discountPercentage);
      return fee * (discount / 100);
    };

    totalFee -= calculatePriceWithDiscount(Number(biaya_daftar), diskon_daftar);
    totalFee -= calculatePriceWithDiscount(Number(biaya_kartu), diskon_kartu);
    totalFee -= calculatePriceWithDiscount(Number(biaya_dokter), diskon_dokter);

    return Math.round(totalFee).toString();
  }
}
