import { Test, TestingModule } from '@nestjs/testing';
import { CombinedBoardResolver } from './combined_board.resolver';

describe('CombinedBoardResolver', () => {
  let resolver: CombinedBoardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinedBoardResolver],
    }).compile();

    resolver = module.get<CombinedBoardResolver>(CombinedBoardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
