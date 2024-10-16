import { Test, TestingModule } from '@nestjs/testing';
import { FamilyStatusController } from './family-status.controller';
import { FamilyStatusService } from '../service/family-status.service';

describe('FamilyStatusController', () => {
  let controller: FamilyStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyStatusController],
      providers: [FamilyStatusService],
    }).compile();

    controller = module.get<FamilyStatusController>(FamilyStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
