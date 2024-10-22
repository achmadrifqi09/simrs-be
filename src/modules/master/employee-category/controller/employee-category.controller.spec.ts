import { Test, TestingModule } from '@nestjs/testing';
import { TypeOfStatusOfficerController } from './employee-category.controller';
import { TypeOfStatusOfficerService } from '../service/employee-category.service';

describe('TypeOfStatusOfficerController', () => {
  let controller: TypeOfStatusOfficerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeOfStatusOfficerController],
      providers: [TypeOfStatusOfficerService],
    }).compile();

    controller = module.get<TypeOfStatusOfficerController>(
      TypeOfStatusOfficerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
