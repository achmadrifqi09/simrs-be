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

  async findDoctorDPJP() {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.QUEUE,
    );
    const url = `${process.env.BASE_URL}/${process.env.QUEUE_SERVICE_NAME}/ref/dokter`;
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

  async findHealthFacility(facilityName: string, facilityType: number) {
    if (![1, 2].includes(Number(facilityType))) {
      throw new HttpException(
        'Jenis faskes tidak valid, 1 untuk Faskes 1 dan 2 untuk Faskes 2/RS',
        HttpStatus.BAD_REQUEST,
      );
    }
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/faskes/${facilityName}/${facilityType}`;

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

  async findProvince() {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/propinsi`;

    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );

      const resJson = JSON.parse(result);
      return resJson?.list || resJson;
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findRegency(provinceCode: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/kabupaten/propinsi/${provinceCode}`;

    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );

      const resJson = JSON.parse(result);
      return resJson?.list || resJson;
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findSubdistrict(regencyCode: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/kecamatan/kabupaten/${regencyCode}`;

    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      const resJson = JSON.parse(result);
      return resJson?.list || resJson;
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }

  async findDiagnosis(diagnosisKeyword: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${this.BASE_URL}/referensi/diagnosa/${diagnosisKeyword}`;

    try {
      const response = await axios.get(url, {
        headers: headers,
      });
      const result = this.bpjsHttpHelper.responseChecker(
        response.data,
        headers.get('X-timestamp').toString(),
      );
      const resJson = JSON.parse(result);
      return resJson?.diagnosa || resJson;
    } catch (error: any) {
      throw new HttpException(error?.message || error, HttpStatus.BAD_REQUEST);
    }
  }
}
