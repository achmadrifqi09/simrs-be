import { Test, TestingModule } from '@nestjs/testing';
import { StructuralPositionController } from './structural-position.controller';
import { StructuralPositionService } from '../service/structural-position.service';

describe('StructuralPositionController', () => {
  let controller: StructuralPositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StructuralPositionController],
      providers: [StructuralPositionService],
    }).compile();

    controller = module.get<StructuralPositionController>(
      StructuralPositionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
