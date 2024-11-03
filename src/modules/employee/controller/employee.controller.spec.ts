import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from '../service/employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  // let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            createEmployee: jest.fn(),
            getEmployee: jest.fn(),
            updateEmployee: jest.fn(),
            uploadFileKTP: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create an employee', () => {
  //   const dto = { nama_pegawai: 'Rakha Pradana', no_reg: '12345' };
  //   await controller.createEmployee(dto);
  //   expect(service.createEmployee).toHaveBeenCalledWith(dto);
  // });

  // it('should get an employee', async () => {
  //   const id = 1;
  //   await controller.getEmployee(id);
  //   expect(service.getEmployee).toHaveBeenCalledWith(id);
  // });

  // it('should call uploadFileKTP', async () => {
  //   const file = { filename: 'test-ktp.jpg' } as Express.Multer.File;
  //   const id = 1;
  //   await controller.uploadFileKTP(id, file);
  //   expect(service.uploadFileKTP).toHaveBeenCalledWith(id, file.filename);
  // });
});
