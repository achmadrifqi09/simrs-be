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

  async findPatientReference(BPJSNumber: string) {
    const headers: AxiosHeaders = this.bpjsHttpHelper.generateHeader(
      BPJSResource.V_CLAIM,
    );
    const url = `${process.env.BASE_URL}/${process.env.V_CLAIM_SERVICE_NAME}/Rujukan/Peserta/${BPJSNumber}`;
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
    const url = `${process.env.BASE_URL}/${process.env.V_CLAIM_SERVICE_NAME}/Rujukan/List/Peserta/${BPJSNumber}`;
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
