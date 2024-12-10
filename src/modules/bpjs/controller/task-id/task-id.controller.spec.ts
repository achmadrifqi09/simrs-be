import { Test, TestingModule } from '@nestjs/testing';
import { TaskIdController } from './task-id.controller';

describe('TaskIdController', () => {
  let controller: TaskIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskIdController],
    }).compile();

    controller = module.get<TaskIdController>(TaskIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
