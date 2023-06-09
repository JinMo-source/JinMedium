import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import compression from '@fastify/compress';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import cors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.register(cors, {
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // app.enableCors();

  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.listen(4000);
}
bootstrap();
