import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from '../repository/employee.repository';
// import { NotFoundException } from '@nestjs/common';

describe('EmployeeService', () => {
  let service: EmployeeService;
  // let repository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EmployeeRepository,
          useValue: {
            createEmployee: jest.fn(),
            getEmployeeById: jest.fn(),
            getAllEmployees: jest.fn(),
            updateEmployee: jest.fn(),
            softDeleteEmployee: jest.fn(),
            restoreEmployee: jest.fn(),
            deleteEmployeePermanently: jest.fn(),
            saveKtpFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    // repository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getEmployeeById', () => {
  //   it('should return employee if found', async () => {
  //     const employee = { id_pegawai: 1, nama_pegawai: 'Rakha Pradana' };
  //     jest.spyOn(repository, 'getEmployeeById').mockResolvedValue(employee);
  //     expect(await service.getEmployeeById(1)).toEqual(employee);
  //   });

  //   it('should throw NotFoundException if employee not found', async () => {
  //     jest.spyOn(repository, 'getEmployeeById').mockResolvedValue(null);
  //     await expect(service.getEmployeeById(1)).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });
  // });

  // describe('createEmployee', () => {
  //   it('should create a new employee', async () => {
  //     const dto = { nama_pegawai: 'Rakha Pradana', no_reg: '12345' };
  //     jest.spyOn(repository, 'createEmployee').mockResolvedValue(dto);
  //     expect(await service.createEmployee(dto)).toEqual(dto);
  //   });
  // });

  // describe('updateEmployee', () => {
  //   it('should update employee if exists', async () => {
  //     const dto = { nama_pegawai: 'Updated Name' };
  //     const id = 1;
  //     jest
  //       .spyOn(service, 'getEmployeeById')
  //       .mockResolvedValue({ id_pegawai: id });
  //     jest.spyOn(repository, 'updateEmployee').mockResolvedValue(dto);

  //     expect(await service.updateEmployee(id, dto)).toEqual(dto);
  //   });
  // });

  // describe('uploadFileKtp', () => {
  //   it('should upload KTP file for employee', async () => {
  //     const id = 1;
  //     const filename = 'ktp-test.jpg';
  //     jest
  //       .spyOn(service, 'getEmployeeById')
  //       .mockResolvedValue({ id_pegawai: id });
  //     jest
  //       .spyOn(repository, 'saveKtpFile')
  //       .mockResolvedValue({ file_ktp: filename });

  //     expect(await service.uploadFileKtp(id, filename)).toEqual({
  //       file_ktp: filename,
  //     });
  //   });
  // });
});
