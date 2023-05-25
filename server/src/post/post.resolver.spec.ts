import { Test, TestingModule } from '@nestjs/testing';
import { BoardsResolver } from './post.resolver';

describe('BoardsResolver', () => {
  let resolver: BoardsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsResolver],
    }).compile();

    resolver = module.get<BoardsResolver>(BoardsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
