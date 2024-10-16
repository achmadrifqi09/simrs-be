import { Test, TestingModule } from '@nestjs/testing';
import { SocialStatusController } from './social-status.controller';
import { SocialStatusService } from '../service/social-status.service';

describe('SocialStatusController', () => {
  let controller: SocialStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialStatusController],
      providers: [SocialStatusService],
    }).compile();

    controller = module.get<SocialStatusController>(SocialStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
