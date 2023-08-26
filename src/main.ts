import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.get('server.port') as number;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nestjs axios demo')
    .setDescription('Playgroup to try out @nestjs/axios package')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });

  await app.listen(port);
  console.log(
    `====> nestjs app successfully started at port ${port}. Swagger doc reachable at 'http://127.0.0.1:${port}/docs'`,
  );
}
bootstrap();
