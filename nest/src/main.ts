import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || 3000;
  const appUrl = configService.get<string>('APP_URL') || `http://localhost:${port}`;

  await app.listen(port);
  logger.log('######################################################');
  logger.log(`## Application is running on: ${appUrl} ##`);
  logger.log('######################################################');
}
bootstrap();
