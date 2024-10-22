import { Test, TestingModule } from '@nestjs/testing';
import { TypeOfEmployeesController } from './employee-type.controller';
import { TypeOfEmployeesService } from '../service/employee-type.service';

describe('TypeOfEmployeesController', () => {
  let controller: TypeOfEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeOfEmployeesController],
      providers: [TypeOfEmployeesService],
    }).compile();

    controller = module.get<TypeOfEmployeesController>(
      TypeOfEmployeesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
