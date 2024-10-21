import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swUser = process.env.SWAGGER_USER || 'x3ngine';
  const swPwd = process.env.SWAGGER_PWD || '123456'
  const userSwgObj = {}
  userSwgObj[swUser] = swPwd

  app.setGlobalPrefix('x3ngine');
  app.use(
    // Paths you want to protect with basic auth
    "/api*",
    basicAuth({
      challenge: true,
      users: userSwgObj
    })
  );

  const config = new DocumentBuilder()
    .setTitle('X3ngine swagger')
    .setDescription('The X3ngine API description')
    .setVersion('1.0')
    .addTag('X3ngine')
    .addApiKey(null,'access-token')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
