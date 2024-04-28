import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seeds/seeds.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const seedService = app.get(SeedService)
  // await  seedService.seed();
  const configService = app.get(ConfigService)

  await app.listen(configService.get<number>('port'));
}
bootstrap();
