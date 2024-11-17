import { Test, TestingModule } from '@nestjs/testing';
import { AdmissionQueueGateway } from './admission-queue.gateway';

describe('AdmissionQueueGateway', () => {
  let gateway: AdmissionQueueGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdmissionQueueGateway],
    }).compile();

    gateway = module.get<AdmissionQueueGateway>(AdmissionQueueGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
