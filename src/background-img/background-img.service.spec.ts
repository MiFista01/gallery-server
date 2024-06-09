import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundImgService } from './background-img.service';

describe('BackgroundImgService', () => {
  let service: BackgroundImgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundImgService],
    }).compile();

    service = module.get<BackgroundImgService>(BackgroundImgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
