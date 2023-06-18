import { Test, TestingModule } from '@nestjs/testing';
import { CombinedBoardService } from './combined_board.service';

describe('CombinedBoardService', () => {
  let service: CombinedBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinedBoardService],
    }).compile();

    service = module.get<CombinedBoardService>(CombinedBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
