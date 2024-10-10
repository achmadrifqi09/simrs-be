import { Dependencies, Injectable } from '@nestjs/common';
import { CountryRepository } from '../repository/country.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import {
  SoftDeleteDTO,
  StatusUpdateDTO,
} from '../../../../common/dto/common.dto';
import { CountryPayloadDTO } from '../dto/country.dto';

@Dependencies([CountryRepository])
@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async findAllCountry(keyword?: string) {
    return this.countryRepository.findAllCountry(keyword || '');
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
    const deletePayload: SoftDeleteDTO = {
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

  async updateStatusCountry(id: number, country: StatusUpdateDTO, req: any) {
    const payload: StatusUpdateDTO = {
      status: Number(country.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.countryRepository.updateStatusCountry(id, payload);
  }
}
