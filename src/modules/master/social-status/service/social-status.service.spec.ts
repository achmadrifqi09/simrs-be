import { Test, TestingModule } from '@nestjs/testing';
import { SocialStatusService } from './social-status.service';

describe('SocialStatusService', () => {
  let service: SocialStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialStatusService],
    }).compile();

    service = module.get<SocialStatusService>(SocialStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
