import { Test, TestingModule } from '@nestjs/testing';
import { TypeOfStatusOfficerService } from './employee-category.service';

describe('TypeOfStatusOfficerService', () => {
  let service: TypeOfStatusOfficerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOfStatusOfficerService],
    }).compile();

    service = module.get<TypeOfStatusOfficerService>(
      TypeOfStatusOfficerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
