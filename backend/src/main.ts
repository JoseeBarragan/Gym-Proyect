import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))
  
  const config = new DocumentBuilder()
    .setTitle('Gym API')
    .setDescription('Documentacion completa de endpoints por entidad del sistema de gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Clase')
    .addTag('Membership')
    .addTag('Payment')
    .addTag('Reservations')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
