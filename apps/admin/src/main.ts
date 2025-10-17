import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../libs/common/src/filters/exeption-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

const PORT = process.env.ADMIN_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);

  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  
  if (process.env.ENVIRONMENT === 'development') {
    const config = new DocumentBuilder()
      .setTitle('kay-food')
      .setDescription('kay food description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(+PORT);
  console.log('App running on port', PORT);
}

bootstrap();
