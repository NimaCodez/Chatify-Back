import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './env';

export const configSwagger = (app: INestApplication): void => {
  const document = new DocumentBuilder()
    .setTitle('Chatify API')
    .setDescription('Chatify API description')
    .setContact('Telegram', 'https://t.me/NimaCodes', 'nimacodez@gmail.com')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const swaggerDocs = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup(appConfig.get('apiDocsRoute'), app, swaggerDocs);
};
