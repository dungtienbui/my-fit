import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Chuyển đổi đối tượng DTO thành đối tượng class-validator
      whitelist: true, // Loại bỏ các trường không được khai báo trong DTO
      forbidNonWhitelisted: true, // Gây lỗi nếu có trường không hợp lệ
    }),
  );

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('MyFIT API')
    .setDescription('API for MyFIT application')
    .setVersion('1.0')
    .addBearerAuth() // Thêm phương thức xác thực Bearer token cho API
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
void bootstrap();
