import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fronted-licoreria-v4.vercel.app',
      'https://fronted-licoreria-v4-git-main-codigoyara.vercel.app',
      'https://fronted-licoreria-v4-culxwrx7w-codigoyara.vercel.app',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();