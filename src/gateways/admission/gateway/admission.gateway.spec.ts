import { Test, TestingModule } from '@nestjs/testing';
import { AdmissionGateway } from './admission.gateway';

describe('AdmissionGateway', () => {
  let gateway: AdmissionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdmissionGateway],
    }).compile();

    gateway = module.get<AdmissionGateway>(AdmissionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
