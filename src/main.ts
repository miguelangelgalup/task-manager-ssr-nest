import { join } from 'path';

import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters';

import * as compression from 'compression';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = (await NestFactory.create(AppModule)) as NestExpressApplication;

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.use(compression());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.HOST_FRONTEND ?? "http://localhost:5173",
    exposedHeaders: ['Content-Disposition'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/api/uploads',
  });

  const APP_PORT = process.env.PORT ?? 3000;

  await app.listen(+APP_PORT);

  logger.log(`App running on port ${APP_PORT}`);
}

bootstrap();
