import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    BoardsModule,
  ],
})
export class AppModule {}
