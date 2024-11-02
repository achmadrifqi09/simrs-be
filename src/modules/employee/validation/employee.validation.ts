import z from 'zod';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const EmployeeValidation = {
  createEmployee: CreateEmployeeDto,
  updateEmployee: UpdateEmployeeDto,
  idParam: z.object({
    id: z.number().int().positive('ID harus berupa angka positif'),
  }),

  fileUpload: z.object({
    filename: z.string().nonempty('Nama file tidak boleh kosong'),
  }),
};

export const KtpFileValidationPipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  ],
});
