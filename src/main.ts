import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.use(rateLi)
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('/api/v1');
  await app.listen(
    configService.get('APP_PORT'),
    configService.get('APP_HOSTNAME'),
  );
}

bootstrap().catch((e) => {
  console.log(e);
});
