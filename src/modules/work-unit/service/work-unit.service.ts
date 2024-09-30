import { Dependencies, Injectable } from '@nestjs/common';
import { WorkUnitRepository } from '../repository/work-unit.repository';

@Dependencies([WorkUnitRepository])
@Injectable()
export class WorkUnitService {
  constructor(private readonly workUnitRepository: WorkUnitRepository) {}
  async getPolyclinic(keyword?: string) {
    return this.workUnitRepository.getPolyclinic(keyword || '');
  }
}
