import { Test, TestingModule } from '@nestjs/testing';
import { TypeOfEmployeesService } from './employee-type.service';

describe('TypeOfEmployeesService', () => {
  let service: TypeOfEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOfEmployeesService],
    }).compile();

    service = module.get<TypeOfEmployeesService>(TypeOfEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
