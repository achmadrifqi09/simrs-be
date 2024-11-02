import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import {
  EmployeeValidation,
  KtpFileValidationPipe,
} from '../validation/employee.validation';
import { ZodPipe } from 'src/pipes/zod-pipe/zod-pipe.pipe';
import { z } from 'zod';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import path from 'path';
import fs from 'fs';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(
    @Body(new ZodPipe(EmployeeValidation.createEmployee))
    createEmployeeDto: z.infer<typeof EmployeeValidation.createEmployee>,
  ) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Put(':id')
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodPipe(EmployeeValidation.updateEmployee))
    updateEmployeeDto: z.infer<typeof EmployeeValidation.updateEmployee>,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete('soft-delete/:id')
  async softDeleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.softDeleteEmployee(id);
  }

  @Put('restore/:id')
  async restoreEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.restoreEmployee(id);
  }

  @Delete(':id')
  async deleteEmployeePermanently(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.deleteEmployeePermanently(id);
  }

  @Post(':id/upload/ktp')
  @UseInterceptors(FileInterceptor('file'))
  async uploadKtpFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      // const storageDir = path.join(process.cwd(), 'storage/ktp');

      // if (!(await fs.promises.access(storageDir).catch(() => false))) {
      //   await fs.promises.mkdir(storageDir, { recursive: true });
      // }

      // const filePath = path.join(storageDir, file.originalname);

      // await fs.promises.writeFile(filePath, file.buffer);

      // const employee = await this.employeeService.updateEmployeeFilename(
      //   id,
      //   file.originalname,
      // );

      // console.log('File berhasil disimpan', filePath);
      // return { message: 'File berhasil diunggah dan disimpan', path: filePath };

      const timestamp = new Date().getTime();
      const fileExtension = path.extname(file.originalname);
      const newFileName = `ktp_${timestamp}${fileExtension}`;

      const storageDir = path.join(process.cwd(), 'storage/ktp');
      if (!(await fs.promises.access(storageDir).catch(() => false))) {
        await fs.promises.mkdir(storageDir, { recursive: true });
      }

      const filePath = path.join(storageDir, newFileName);
      await fs.promises.writeFile(filePath, file.buffer);

      const employee = await this.employeeService.updateEmployeeFilename(
        id,
        newFileName,
      );

      return {
        message: 'File berhasil diunggah dan disimpan',
        data: {
          employee_id: id,
          file_name: newFileName,
          file_path: filePath,
        },
      };
    } catch (error) {
      console.error('Error upload file:', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Gagal upload file KTP');
    }
    // console.log(file);
  }

  // @Post('upload-ktp/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadKtpFile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.employeeService.uploadFileKtp(id, file.filename);
  // }

  // @Post('upload-kk/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadKkFile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.employeeService.uploadFileKk(id, file.filename);
  // }

  // @Post('upload-ktam/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadKtamFile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.employeeService.uploadFileKtam(id, file.filename);
  // }

  // @Post('upload-npwp/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadNpwpFile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.employeeService.uploadFileNpwp(id, file.filename);
  // }
}
