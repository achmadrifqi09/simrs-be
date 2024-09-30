const CryptoJS = require('crypto-js');

export class Cipher {
  static decryptClientKey(cipherText: string) {
    try {
      const secretKey = process.env.CLIENT_SECRET_KEY || '';
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      const plainText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(plainText);
    } catch (err) {
      return err;
    }
  }
}
