import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { AccessMenuGuard } from '../../../guards/access-menu/access-menu.guard';
import { Permission } from '../../../decorators/permission/permission.decorator';
import { Action } from '../../../common/enums/action.enum';
import { ZodPipe } from '../../../pipes/zod-pipe/zod-pipe.pipe';
import { employeeValidation, codeDpjpValidation } from '../validation/employee.validation';
import { UpdateCodeDpjp } from '../dto/employee.dto';
import { Employee } from '@prisma/client';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';

@Controller({
  path: 'employee',
  version: '1',
})
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findEmployee(
    @Query('keyword') keyword: string
    // @Query('status') status: number,
  ) {
    return this.employeeService.findEmployee(keyword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @Header('Content-Type', 'multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'foto', maxCount: 1 },
        { name: 'file_ktp', maxCount: 1 },
        { name: 'file_kk', maxCount: 1 },
        { name: 'file_ktam', maxCount: 1 },
        { name: 'file_npwp', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const tempPath = './storage/temp/';
            const folders = {
              foto: tempPath,
              file_ktp: tempPath,
              file_kk: tempPath,
              file_ktam: tempPath,
              file_npwp: tempPath,
            };
            const destFolder = folders[file.fieldname];
            if (!fs.existsSync(destFolder)) {
              fs.mkdirSync(destFolder, { recursive: true });
            }

            cb(null, destFolder);
          },
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          if (file.size > 2 * 1024 * 1024) {
            return cb(new Error('Ukuran file tidak boleh dari 2MB'), false);
          }
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Hanya file gambar yang di izinkan!'), false);
          }
          cb(null, true);
        },
      },
    ),
  )
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_CREATE)
  async createEmployee(
    @UploadedFiles()
    files: {
      foto?: Express.Multer.File[];
      file_ktp?: Express.Multer.File[];
      file_kk?: Express.Multer.File[];
      file_ktam?: Express.Multer.File[];
      file_npwp?: Express.Multer.File[];
    },
    @Req() req: any,
    @Body(new ZodPipe(employeeValidation))
    employee: Employee,
  ) {
    // employee.foto = files.foto ? files.foto[0]?.filename : null;
    // employee.file_ktp = files.file_ktp ? files.file_ktp[0]?.filename : null;
    // employee.file_kk = files.file_kk ? files.file_kk[0]?.filename : null;
    // employee.file_ktam = files.file_ktam ? files.file_ktam[0]?.filename : null;
    // employee.file_npwp = files.file_npwp ? files.file_npwp[0]?.filename : null;

    // return this.employeeService.createEmployee(employee, files, req);
    try {
      employee.foto = files.foto ? files.foto[0]?.filename : null;
      employee.file_ktp = files.file_ktp ? files.file_ktp[0]?.filename : null;
      employee.file_kk = files.file_kk ? files.file_kk[0]?.filename : null;
      employee.file_ktam = files.file_ktam
        ? files.file_ktam[0]?.filename
        : null;
      employee.file_npwp = files.file_npwp
        ? files.file_npwp[0]?.filename
        : null;

      const createdEmployee = await this.employeeService.createEmployee(
        employee,
        files,
        req,
      );

      if (createdEmployee) {
        await this.moveFilesToFinalStorage(files);
      }

      return createdEmployee;
    } catch (error) {
      this.cleanupTemporaryFiles(files);
      throw error;
    }
  }

  private async moveFilesToFinalStorage(files: any) {
    const finalFolders = {
      foto: './storage/foto/',
      file_ktp: './storage/file_ktp/',
      file_kk: './storage/file_kk/',
      file_ktam: './storage/file_ktam/',
      file_npwp: './storage/file_npwp/',
    };

    for (const folder in finalFolders) {
      if (!fs.existsSync(finalFolders[folder])) {
        fs.mkdirSync(finalFolders[folder], { recursive: true });
      }
    }

    for (const fieldname in files) {
      const file = files[fieldname]?.[0];
      if (file) {
        const tempPath = path.join('./storage/temp/', file.filename);
        const finalFolder = finalFolders[fieldname];
        const finalPath = path.join(finalFolder, file.filename);

        if (fs.existsSync(tempPath)) {
          fs.renameSync(tempPath, finalPath);
        }
      }
    }
  }

  private cleanupTemporaryFiles(files: any) {
    for (const fieldname in files) {
      const file = files[fieldname]?.[0];
      if (file) {
        const tempPath = path.join('./storage/temp/', file.filename);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'multipart/form-data')
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateEmployee(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(employeeValidation))
    employee: Employee,
  ) {
    return this.employeeService.updateEmployee(id, employee, req);
  }

  @Patch('/:id/kode-dpjp')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'multipart/form-data')
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateCodeDpjp(
    @Param('id') id: number,
    @Req() req: any,
    @Body(new ZodPipe(codeDpjpValidation))
    employee: UpdateCodeDpjp,
  ) {
    return this.employeeService.updateCodeDpjp(id, employee, req);
  }

  @Patch(':id/foto')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './storage/foto/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `foto-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateFoto(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/(png|jpeg|jpg))$/,
        })
        .addMaxSizeValidator({ maxSize: 2 * (1024 * 1024) })
        .build({
          errorHttpStatusCode: 400,
          exceptionFactory: () => {
            throw new HttpException(
              'Hanya file gambar PNG, JPG, atau JPEG yang diperbolehkan dan ukuran maksimal 2MB.',
              HttpStatus.BAD_REQUEST,
            );
          },
        }),
    )
    foto: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileName = foto?.filename;
    return this.employeeService.updateEmployeePhoto(id, fileName, req);
  }

  @Patch(':id/ktp')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file_ktp', {
      storage: diskStorage({
        destination: './storage/file_ktp/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `ktp-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateKtp(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/(png|jpeg|jpg))$/,
        })
        .addMaxSizeValidator({ maxSize: 2 * (1024 * 1024) })
        .build({
          errorHttpStatusCode: 400,
          exceptionFactory: () => {
            throw new HttpException(
              'Hanya file gambar PNG, JPG, atau JPEG yang diperbolehkan dan ukuran maksimal 2MB.',
              HttpStatus.BAD_REQUEST,
            );
          },
        }),
    )
    file_ktp: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileName = file_ktp?.filename;
    return this.employeeService.updateEmployeeKtp(id, fileName, req);
  }

  @Patch(':id/kk')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file_kk', {
      storage: diskStorage({
        destination: './storage/file_kk/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `kk-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateKk(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/(png|jpeg|jpg))$/,
        })
        .addMaxSizeValidator({ maxSize: 2 * (1024 * 1024) })
        .build({
          errorHttpStatusCode: 400,
          exceptionFactory: () => {
            throw new HttpException(
              'Hanya file gambar PNG, JPG, atau JPEG yang diperbolehkan dan ukuran maksimal 2MB.',
              HttpStatus.BAD_REQUEST,
            );
          },
        }),
    )
    file_kk: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileName = file_kk?.filename;
    return this.employeeService.updateEmployeeKk(id, fileName, req);
  }

  @Patch(':id/ktam')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file_ktam', {
      storage: diskStorage({
        destination: './storage/file_ktam/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `ktam-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateKtam(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/(png|jpeg|jpg))$/,
        })
        .addMaxSizeValidator({ maxSize: 2 * (1024 * 1024) })
        .build({
          errorHttpStatusCode: 400,
          exceptionFactory: () => {
            throw new HttpException(
              'Hanya file gambar PNG, JPG, atau JPEG yang diperbolehkan dan ukuran maksimal 2MB.',
              HttpStatus.BAD_REQUEST,
            );
          },
        }),
    )
    file_ktam: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileName = file_ktam?.filename;
    return this.employeeService.updateEmployeeKtam(id, fileName, req);
  }

  @Patch(':id/npwp')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file_npwp', {
      storage: diskStorage({
        destination: './storage/file_npwp/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `npwp-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_UPDATE)
  async updateNpwp(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/(png|jpeg|jpg))$/,
        })
        .addMaxSizeValidator({ maxSize: 2 * (1024 * 1024) })
        .build({
          errorHttpStatusCode: 400,
          exceptionFactory: () => {
            throw new HttpException(
              'Hanya file gambar PNG, JPG, atau JPEG yang diperbolehkan dan ukuran maksimal 2MB.',
              HttpStatus.BAD_REQUEST,
            );
          },
        }),
    )
    file_npwp: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileName = file_npwp?.filename;
    return this.employeeService.updateEmployeeNpwp(id, fileName, req);
  }

  @Delete('/:id')
  @UseGuards(AccessMenuGuard)
  @Permission('data-pegawai', Action.CAN_DELETE)
  async softDeleteEmployee(@Param('id') id: number, @Req() req: any) {
    return this.employeeService.softDeleteEmployee(id, req);
  }
}
