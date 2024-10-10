import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { appConfig, cookieConfig } from './config/env';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser(cookieConfig.get('secret')));
  configSwagger(app);

  await app.listen(appConfig.get('port'));
}

bootstrap()
  .then(() => {
    console.log(`Server started on port ${appConfig.get('port')}`);
  })
  .then(() => {
    console.log(
      `ApiDocs: http://${appConfig.get('appHost')}:${appConfig.get(
        'port',
      )}/${appConfig.get('apiDocsRoute')}`,
    );
  })
  .catch(error => {
    console.error(error);
  });
