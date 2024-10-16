import { Test, TestingModule } from '@nestjs/testing';
import { EducationLevelController } from './education-level.controller';
import { EducationLevelService } from '../service/education-level.service';

describe('EducationLevelController', () => {
  let controller: EducationLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationLevelController],
      providers: [EducationLevelService],
    }).compile();

    controller = module.get<EducationLevelController>(EducationLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
