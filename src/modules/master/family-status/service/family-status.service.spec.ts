import { Test, TestingModule } from '@nestjs/testing';
import { FamilyStatusService } from './family-status.service';

describe('FamilyStatusService', () => {
  let service: FamilyStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyStatusService],
    }).compile();

    service = module.get<FamilyStatusService>(FamilyStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
