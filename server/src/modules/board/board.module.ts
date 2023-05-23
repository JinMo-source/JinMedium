import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import BoardService from './service/board.service';
import BoardModel from './model/board.model';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/board/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [BoardResolver, BoardService, BoardModel],
})
export class BoardModule {}
