import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodType, ZodIssue } from 'zod';

interface FormattedZodError {
  path: (string | number)[];
  message: string;
  code: string;
  validation?: unknown;
}

@Injectable()
export class ZodPipe<T extends ZodType> implements PipeTransform {
  constructor(private readonly schema: T) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata): T['_output'] {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = this.formatZodError(error);
        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }
      throw error;
    }
  }

  private formatZodError(error: ZodError): FormattedZodError[] {
    return error.errors.map((err: ZodIssue) => ({
      path: err.path,
      message: err.message,
      code: err.code,
      ...(this.isCustomValidation(err) && { validation: err.message }),
    }));
  }

  private isCustomValidation(error: ZodIssue): boolean {
    return error.code === 'custom' && error.params !== undefined;
  }
}
