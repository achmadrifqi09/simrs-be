import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BPJSHttpHelper } from '../helper/bpjs-http.helper';
import { BPJSResource } from '../../../common/enums/bpjs-resource-type';
import axios, { AxiosHeaders } from 'axios';
import * as process from 'node:process';

@Dependencies([BPJSHttpHelper])
@Injectable()
export class VClaimService {
  constructor(private readonly bpjsHttpHelper: BPJSHttpHelper) {}
  private BASE_URL = `${process.env.BASE_URL}/${process.env.V_CLAIM_SERVICE_NAME}`;

  async findPatientReference(BPJSNumber: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/Rujukan/Peserta/${BPJSNumber}`;
    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllPatientReference(BPJSNumber: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/Rujukan/List/Peserta/${BPJSNumber}`;
    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findPatientReferenceByReferenceNumber(referenceNumber: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/Rujukan/${referenceNumber}`;
    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findPolyclinicReference(keyword: string) {
    if (!keyword) {
      throw new HttpException(
        'Masukkan nama poliklinik',
        HttpStatus.BAD_REQUEST,
      );
    }
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/poli/${keyword}`;
    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findDoctorDPJP(
    serviceType: number,
    serviceDate: string,
    specialist: string,
  ) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(serviceDate)) {
      throw new HttpException(
        'Format tanggal layanan harus yyyy-mm-dd',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (![1, 2].includes(Number(serviceType))) {
      throw new HttpException(
        'Jenis layanan harus 1 untuk rawat inap dan 2 untuk rawat jalan',
        HttpStatus.BAD_REQUEST,
      );
    }

    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/dokter/pelayanan/${serviceType}/tglPelayanan/${serviceDate}/Spesialis/${specialist}`;

    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findControllLatter(controllNumber: string) {
    if (!controllNumber) {
      throw new HttpException(
        'Nomor surat kontrol harus disertakan',
        HttpStatus.BAD_REQUEST,
      );
    }
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/RencanaKontrol/noSuratKontrol/${controllNumber}`;
    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      return JSON.parse(result);
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }
}
