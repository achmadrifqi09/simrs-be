import CryptoJS from 'crypto-js';

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
}
