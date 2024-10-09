import { Test, TestingModule } from '@nestjs/testing';
import { RankOfEmployeesService } from './employee-rank.service';

describe('RankOfEmployeesService', () => {
  let service: RankOfEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankOfEmployeesService],
    }).compile();

    service = module.get<RankOfEmployeesService>(RankOfEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
