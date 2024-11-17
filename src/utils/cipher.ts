import CryptoJS from 'crypto-js';
import * as process from 'node:process';
import { generateUnixTimestamp } from './date-generator';
import { Signature } from '../modules/bpjs/dto/common.dto';
import * as LZString from 'lz-string';

export class Cipher {
  static decryptClientKey(cipherText: string, secret: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, secret);
      const plainText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(plainText);
    } catch (err) {
      return err;
    }
  }

  static generateBPJSSignature() {
    const timestamp = generateUnixTimestamp();
    const message = `${process.env.CONSUMER_ID}&${timestamp}`;
    const signature = CryptoJS.HmacSHA256(message, process.env.SECRET_KEY);
    const encodedSignature = CryptoJS.enc.Base64.stringify(signature);

    const result: Signature = {
      timestamp: timestamp,
      code: encodedSignature,
    };
    return result;
  }

  static decompress(payload: string) {
    return LZString.decompressFromEncodedURIComponent(payload);
  }

  static decryptAndCompress(key: string, payload: string) {
    return this.decompress(this.stringDecryption(key, payload));
  }

  private static stringDecryption(key: string, payload: string): string {
    try {
      const keyHash = CryptoJS.SHA256(key);
      const keyHashWordArray = CryptoJS.enc.Hex.parse(keyHash.toString());

      const iv = CryptoJS.enc.Hex.parse(keyHash.toString()).words.slice(0, 4);
      const ivWordArray = CryptoJS.lib.WordArray.create(iv);

      const encrypted = payload.replace(/\n/g, '');
      const decrypted = CryptoJS.AES.decrypt(encrypted, keyHashWordArray, {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
