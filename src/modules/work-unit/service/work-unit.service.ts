import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { WorkUnitRepository } from '../repository/work-unit.repository';
import { generateCurrentDate } from '../../../utils/date-formatter';
import { WorkUnit, WorkUnitUpdateQueueStatus } from '../type/work-unit.type';
import { SoftDelete, UpdateStatus } from '../../../common/types/common.type';

@Dependencies([WorkUnitRepository])
@Injectable()
export class WorkUnitService {
  constructor(private readonly workUnitRepository: WorkUnitRepository) {}
  async findActivePolyclinic(keyword?: string) {
    return this.workUnitRepository.findActivePolyclinic(keyword || '');
  }

  async findActiveSubOrParentUnit(keyword?: string) {
    return this.workUnitRepository.findActiveSubOrParentUnit(keyword || '');
  }

  async findParentWorkUnit(keyword?: string) {
    return this.workUnitRepository.findParentWorkUnit(keyword || '');
  }

  async findAllWorkUnit(
    is_parent_unit: number = 1,
    parent_id?: number,
    field_id?: number,
    keyword?: string,
    serviceType?: number,
    workUnitId?: number,
    cursor: number = 0,
    take: number = 10,
  ) {
    return this.workUnitRepository.findAllWorkUnit(
      is_parent_unit,
      parent_id,
      field_id,
      keyword || '',
      serviceType,
      workUnitId,
      cursor,
      take,
    );
  }

  async createWorkUnit(workUnit: WorkUnit, req: any) {
    if (
      isNaN(workUnit.jenis_pelayanan) ||
      !(workUnit.jenis_pelayanan in [0, 1, 2, 3])
    ) {
      throw new HttpException(
        'Jenis layanan tidak validd',
        HttpStatus.BAD_REQUEST,
      );
    }
    workUnit = {
      nama_unit_kerja: workUnit.nama_unit_kerja,
      id_unit_induk: Number(workUnit.id_unit_induk) || null,
      is_parent_unit: Number(workUnit.is_parent_unit) || 0,
      id_bidang: Number(workUnit.id_bidang) || null,
      status: isNaN(Number(workUnit.status)) ? 1 : Number(workUnit.status),
      status_antrian: isNaN(Number(workUnit.status_antrian))
        ? 0
        : Number(workUnit.status_antrian),
      kode_instalasi_bpjs: workUnit.kode_instalasi_bpjs || null,
      jenis_pelayanan: workUnit.jenis_pelayanan,
      created_by: req.user?.id,
      created_at: generateCurrentDate(),
    };
    return this.workUnitRepository.createWorkUnit(workUnit);
  }

  async updateWorkUnit(id: number, workUnit: WorkUnit, req: any) {
    if (
      isNaN(workUnit.jenis_pelayanan) ||
      !(workUnit.jenis_pelayanan in [0, 1, 2, 3])
    ) {
      throw new HttpException(
        'Jenis layanan tidak validd',
        HttpStatus.BAD_REQUEST,
      );
    }
    workUnit = {
      nama_unit_kerja: workUnit.nama_unit_kerja,
      id_unit_induk: Number(workUnit.id_unit_induk) || null,
      is_parent_unit: Number(workUnit.is_parent_unit) || 0,
      id_bidang: Number(workUnit.id_bidang) || null,
      status: isNaN(Number(workUnit.status)) ? 1 : Number(workUnit.status),
      status_antrian: isNaN(Number(workUnit.status_antrian))
        ? 0
        : Number(workUnit.status_antrian),
      kode_instalasi_bpjs: workUnit.kode_instalasi_bpjs || null,
      jenis_pelayanan: workUnit.jenis_pelayanan,
      modified_by: req.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.workUnitRepository.updateWorkUnit(id, workUnit);
  }

  async updateStatusWorkUnit(id: number, workUnit: UpdateStatus, req: any) {
    const payload: UpdateStatus = {
      status: Number(workUnit.status),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.workUnitRepository.updateStatusWorkUnit(id, payload);
  }

  async updateQueueStatus(
    id: number,
    workUnit: WorkUnitUpdateQueueStatus,
    req: any,
  ) {
    const payload: WorkUnitUpdateQueueStatus = {
      status_antrian: Number(workUnit.status_antrian),
      modified_by: req?.user?.id,
      modified_at: generateCurrentDate(),
    };
    return this.workUnitRepository.updateQueueStatus(id, payload);
  }

  async softDeleteWorkUnit(id: number, req: any) {
    const deletePayload: SoftDelete = {
      is_deleted: true,
      deleted_by: req.user?.id,
      deleted_at: generateCurrentDate(),
    };
    return this.workUnitRepository.softDeleteWorkUnit(id, deletePayload);
  }
}
