import { Test, TestingModule } from '@nestjs/testing';
import { FieldOfWorkUnitService } from './field-of-work-unit.service';

describe('FieldOfWorkUnitService', () => {
  let service: FieldOfWorkUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldOfWorkUnitService],
    }).compile();

    service = module.get<FieldOfWorkUnitService>(FieldOfWorkUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
