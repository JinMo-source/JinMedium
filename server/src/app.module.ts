import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entities/post.entity';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'parkjinmo',
      password: 'qkrwlsah123',
      database: 'medium',
      entities: [PostEntity],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/board/schema.gql'),
      playground: true,
    }),
  ],
  providers: [PostModule],
})
export class AppModule {}
