import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorMessage = exception.getResponse();
    const message = (errorMessage as any).error || errorMessage;
    const responseBody = {
      status_code: status,
      errors: message,
    };
    if (status === 429) {
      responseBody.errors = 'Terlalu banyak permintaan, coba lagi 1 menit';
    }
    response.status(status).json(responseBody);
  }
}
