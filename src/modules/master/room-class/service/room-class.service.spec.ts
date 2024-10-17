import { Test, TestingModule } from '@nestjs/testing';
import { RoomClassService } from './room-class.service';

describe('RoomClassService', () => {
  let service: RoomClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomClassService],
    }).compile();

    service = module.get<RoomClassService>(RoomClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
