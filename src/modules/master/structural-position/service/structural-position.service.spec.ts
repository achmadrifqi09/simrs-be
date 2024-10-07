import { Test, TestingModule } from '@nestjs/testing';
import { StructuralPositionService } from './structural-position.service';

describe('StructuralPositionService', () => {
  let service: StructuralPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StructuralPositionService],
    }).compile();

    service = module.get<StructuralPositionService>(StructuralPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
