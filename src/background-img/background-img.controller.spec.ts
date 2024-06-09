import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundImgController } from './background-img.controller';
import { BackgroundImgService } from './background-img.service';

describe('BackgroundImgController', () => {
  let controller: BackgroundImgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackgroundImgController],
      providers: [BackgroundImgService],
    }).compile();

    controller = module.get<BackgroundImgController>(BackgroundImgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
