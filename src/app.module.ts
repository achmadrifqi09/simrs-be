import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppMiddleware } from './middlewares/app/app.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule, EmployeeModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).exclude('/').forRoutes('*');
  }
}
