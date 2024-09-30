import { Test, TestingModule } from '@nestjs/testing';
import { WorkUnitController } from './work-unit.controller';
import { WorkUnitService } from '../service/work-unit.service';

describe('WorkUnitController', () => {
  let controller: WorkUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkUnitController],
      providers: [WorkUnitService],
    }).compile();

    controller = module.get<WorkUnitController>(WorkUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
