import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CountryRepository } from '../repository/country.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';
import { CountryPayloadDTO } from '../dto/country.dto';

@Dependencies([CountryRepository])
@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async findAllCountry(keyword?: string, status?: number) {
    if (typeof status !== 'undefined' && !/^[01]$/.test(status.toString())) {
      throw new HttpException(
        'Format status tidak sesuai',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.countryRepository.findAllCountry(keyword ?? '', status);
  }

  async createCountry(country: CountryPayloadDTO, req: any) {
    country = {
      nama: country.nama,
      status: isNaN(Number(country.status)) ? 1 : Number(country.status),
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.countryRepository.createCountry(country);
  }

  async softDeleteCountry(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.countryRepository.softDeleteCountry(id, deletePayload);
  }

  async updateCountry(id: number, country: CountryPayloadDTO, req: any) {
    country = {
      nama: country.nama,
      status: isNaN(Number(country.status)) ? 1 : Number(country.status),
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.countryRepository.updateCountry(id, country);
  }

  async updateStatusCountry(id: number, country: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(country.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.countryRepository.updateStatusCountry(id, payload);
  }
}
