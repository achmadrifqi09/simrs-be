import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationFeeController } from '../registration-fee.controller';
import { RegistrationFeeService } from '../service/registration-fee.service';

describe('RegistrationFeeController', () => {
  let controller: RegistrationFeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationFeeController],
      providers: [RegistrationFeeService],
    }).compile();

    controller = module.get<RegistrationFeeController>(
      RegistrationFeeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
