import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '@api/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalErrorHandler } from '@api/exceptions/global.error.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new GlobalErrorHandler());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(config.SERVER_PORT, () =>
    Logger.log(`API running on port ${config.SERVER_PORT}`, 'App'),
  );
}
bootstrap();
