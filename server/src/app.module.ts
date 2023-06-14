import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BoardModule } from './board/board.module';
import { Board } from './board/entities/board.entity';
import { UsersModule } from './users/Users.module';
import { User } from './users/entities/User.entity';
import { Verification } from './mail/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { MailController } from './mail/mail.controller';
import { PassportModule } from '@nestjs/passport';
import fastifyAdapter from '@as-integrations/fastify';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'test', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        MAILGUN_USER_NAME: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_TIMEOUT: Joi.number().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Board, User, Verification],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailerModule.forRoot({
      // Mailgun 설정
      transport: {
        service: 'Mailgun',
        auth: {
          user: 'YOUR_MAILGUN_USERNAME',
          pass: 'YOUR_MAILGUN_PASSWORD',
        },
      },
    }),
    MailerModule.forRoot({
      transport: {
        // Mailgun 설정
        service: 'mailgun',
        // Mailgun 설정
        auth: {
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN_NAME,
        },
      },
    }),
    UsersModule,
    BoardModule,
    MailModule,
    AuthModule,
  ],
  controllers: [MailController],
})
export class AppModule {}
