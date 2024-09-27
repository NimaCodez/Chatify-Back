import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './env';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const configSwagger = (app: INestApplication): void => {
  const document = new DocumentBuilder()
    .setTitle('Chatify API')
    .setDescription('Chatify API description')
    .setContact('Telegram', 'https://t.me/NimaCodes', 'nimacodez@gmail.com')
    .addCookieAuth('accessToken', {
      type:'http',
      bearerFormat: 'JWT',
      in: 'header',
      scheme: 'bearer'
    })
    .setVersion('1.0')
    .build();

  const swaggerDocs = SwaggerModule.createDocument(app, document);
  
  SwaggerModule.setup(appConfig.get('apiDocsRoute'), app, swaggerDocs);
};

function swaggerAuthConfig(): SecuritySchemeObject {
  return {
    type: 'http',
    bearerFormat: 'JWT',
    in: 'header',
    scheme: 'bearer',
  };
}
