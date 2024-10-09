import { Test, TestingModule } from '@nestjs/testing';
import { RankOfEmployeesController } from './employee-rank.controller';
import { RankOfEmployeesService } from '../service/employee-rank.service';

describe('RankOfEmployeesController', () => {
  let controller: RankOfEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankOfEmployeesController],
      providers: [RankOfEmployeesService],
    }).compile();

    controller = module.get<RankOfEmployeesController>(
      RankOfEmployeesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
