import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { AuthResponse, CredentialsDto } from '../../dto/auth';
import qs from 'qs';

@Injectable()
export class AuthService {
  async generateToken() {
    try {
      const url = `${process.env.SATSET_BASE_URL}/oauth2/v1/accesstoken?grant_type=client_credentials`;
      const credentials: CredentialsDto = {
        client_id: process.env.SATSET_CLIENT_ID,
        client_secret: process.env.SATSET_CLIENT_SECRET,
      };

      const response = await axios({
        method: 'POST',
        url: url,
        data: qs.stringify(credentials),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status === 200) {
        const result: AuthResponse = response?.data;
        return result.access_token;
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          error.message,
          this.chekcHttpStatus(error?.status),
        );
      }
    }
  }

  private chekcHttpStatus(httpStatus: number): HttpStatus {
    switch (httpStatus) {
      case 400:
        return HttpStatus.BAD_REQUEST;
      case 401:
        return HttpStatus.UNAUTHORIZED;
      case 500:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      case 503:
        return HttpStatus.FORBIDDEN;
      case 429:
        return HttpStatus.TOO_MANY_REQUESTS;
      default:
        return HttpStatus.OK;
    }
  }
}
