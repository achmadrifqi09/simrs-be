import { Test, TestingModule } from '@nestjs/testing';
import { FieldOfWorkUnitController } from './field-of-work-unit.controller';
import { FieldOfWorkUnitService } from '../service/field-of-work-unit.service';

describe('FieldOfWorkUnitController', () => {
  let controller: FieldOfWorkUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldOfWorkUnitController],
      providers: [FieldOfWorkUnitService],
    }).compile();

    controller = module.get<FieldOfWorkUnitController>(
      FieldOfWorkUnitController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
