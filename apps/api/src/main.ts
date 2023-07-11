import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '@api/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(config.SERVER_PORT);
}
bootstrap();
