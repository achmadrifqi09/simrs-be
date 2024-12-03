import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationFeeService } from '../registration-fee.service';

describe('RegistrationFeeService', () => {
  let service: RegistrationFeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationFeeService],
    }).compile();

    service = module.get<RegistrationFeeService>(RegistrationFeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
