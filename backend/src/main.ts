import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 모든 IP에서 접속 허용 (0.0.0.0)
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  
  console.log(`🚀 Application is running on: http://0.0.0.0:${process.env.PORT ?? 3000}`);
  console.log(`📱 같은 와이파이에서 접속: http://[내IP주소]:${process.env.PORT ?? 3000}`);
}
bootstrap();
