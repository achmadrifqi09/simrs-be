import { Test, TestingModule } from '@nestjs/testing';
import { VClaimController } from './v-claim.controller';

describe('VClaimController', () => {
  let controller: VClaimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VClaimController],
    }).compile();

    controller = module.get<VClaimController>(VClaimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
