import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CounterRepository } from '../repository/counter.repository';
import { generateCurrentDate } from '../../../../utils/date-formatter';
import { Counter, CounterPayloadDTO } from '../dto/counter.dto';
import {
  SoftDelete,
  UpdateStatus,
} from '../../../../common/types/common.type';

@Dependencies([CounterRepository])
@Injectable()
export class CounterService {
  constructor(private readonly counterRepository: CounterRepository) {}

  async findCounterById(id: number) {
    if (!Number(id)) {
      throw new HttpException(
        'Format id loket tidak valid',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.counterRepository.findCounterById(id);
  }

  async findCounter(keyword: string, counterType: number) {
    if (!Number(counterType) && counterType !== undefined) {
      throw new HttpException(
        'Jenis loket tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.counterRepository.findCounter(keyword || '', counterType || 0);
  }

  async findActiveCounterByType(type: number): Promise<Counter[]> {
    if (!Number(type) || type === undefined) {
      throw new HttpException('Jenis loket tidak valid', HttpStatus.NOT_FOUND);
    }
    return this.counterRepository.findActiveCounterByType(type);
  }

  async createCounter(counter: CounterPayloadDTO, req: any) {
    counter = {
      nama_loket: counter.nama_loket,
      status: isNaN(Number(counter.status)) ? 1 : Number(counter.status),
      jenis_loket: counter.jenis_loket,
      keterangan: counter.keterangan,
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.counterRepository.createCounter(counter);
  }

  async updateCounter(id: number, counter: CounterPayloadDTO, req: any) {
    if (!Number(counter.status)) {
      throw new HttpException(
        'Status loket tidak valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    counter = {
      nama_loket: counter.nama_loket,
      status: isNaN(Number(counter.status)) ? 1 : Number(counter.status),
      jenis_loket: counter.jenis_loket,
      keterangan: counter.keterangan,
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.counterRepository.updateCounter(id, counter);
  }

  async updateStatusCounter(id: number, country: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(country.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.counterRepository.updateStatusCounter(id, payload);
  }

  async softDeleteCounter(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.counterRepository.softDeleteCounter(id, deletePayload);
  }
}
