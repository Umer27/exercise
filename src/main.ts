import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import {AppConfigService} from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //load configuration
  const configService = app.get(AppConfigService);
  const logger = new Logger('Main');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(configService.PORT);
  logger.log(`${configService.APP_NAME}: Listening at PORT ${configService.PORT}`);
}

bootstrap();
