import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable automatic transformation
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: false, // Don't throw errors for extra properties
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      /^https:\/\/.*\.vercel\.app$/,
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();