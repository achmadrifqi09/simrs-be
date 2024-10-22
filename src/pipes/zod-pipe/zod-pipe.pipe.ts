import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodObject } from 'zod';

@Injectable()
export class ZodPipe<T extends ZodObject<any>> implements PipeTransform {
  constructor(private readonly schema: T) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata): T['_output'] {
    return this.schema.parse(value);
  }
}
