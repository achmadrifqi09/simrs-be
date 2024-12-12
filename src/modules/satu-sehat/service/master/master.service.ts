import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import axios, { AxiosError } from 'axios';

@Injectable()
export class MasterService {
  private BASE_URL = `${process.env.SATSET_BASE_URL}/fhir-r4/v1`;
  constructor(private readonly authService: AuthService) {}

  async findPatientByNIK(NIK: string) {
    const param = `https://fhir.kemkes.go.id/id/nik|${NIK}`;
    const url = `${this.BASE_URL}/Patient?identifier=${param}`;
    // console.log(url);
    try {
      const accessToken = await this.authService.generateToken();

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      if (error instanceof AxiosError)
        throw new HttpException(
          error.message,
          error?.status >= 400 && error.status < 500
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );

      if (error instanceof HttpException) {
        throw new HttpException(error.getResponse(), error.getStatus());
      }

      throw new HttpException(
        error?.message || 'Terjadi masalah yang tidak terduga',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
