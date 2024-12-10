import { BPJSResource } from '../../../common/enums/bpjs-resource-type';
import { BPJSResponse, Signature } from '../dto/common.dto';
import { Cipher } from '../../../utils/cipher';
import * as process from 'node:process';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosHeaders } from 'axios';

@Injectable()
export class BPJSHttpHelper {
  generateHeader(resourceType: BPJSResource) {
    const signature: Signature = Cipher.generateBPJSSignature();
    return new AxiosHeaders({
      'X-signature': signature.code,
      'X-timestamp': signature.timestamp,
      user_key:
        resourceType === BPJSResource.V_CLAIM
          ? process.env.V_CLAIM_USER_KEY
          : process.env.QUEUE_USER_KEY,
      'X-cons-id': process.env.CONSUMER_ID,
    });
  }

  responseChecker(result: BPJSResponse, timestamp: string | number) {
    if (
      (result?.metadata || result?.metaData) &&
      (Number(result?.metadata?.code) === 200 ||
        Number(result?.metaData?.code) === 200)
    ) {
      if (result?.response !== null) {
        const decryptionKey = `${process.env.CONSUMER_ID}${process.env.SECRET_KEY}${timestamp}`;
        return Cipher.decryptAndCompress(decryptionKey, result.response);
      }
    } else {
      throw new HttpException(
        result?.metadata?.message || result?.metaData?.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
