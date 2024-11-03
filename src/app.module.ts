import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppMiddleware } from './middlewares/app/app.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './modules/employee/employee.module';
import { WorkUnitModule } from './modules/work-unit/work-unit.module';
import { ValidationFilter } from './filters/validation/validation.filter';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { ReligionModule } from './modules/master/religion/religion.module';
import { MasterModule } from './modules/master/master.module';
import { MenuModule } from './modules/menu/menu.module';
import { UserAccessModule } from './modules/user-access/user-access.module';
import { CounterGateway } from './gateways/counter/gateway/counter.gateway';
import { FieldOfWorkUnitModule } from './modules/field-of-work-unit/field-of-work-unit.module';
import { AuthGuard } from './guards/auth/auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DoctorScheduleModule } from './modules/doctor-schedule/doctor-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLER_TTL || 60000),
        limit: Number(process.env.THROTTLER_LIMIT || 100),
      },
    ]),
    UserModule,
    PrismaModule,
    EmployeeModule,
    WorkUnitModule,
    AuthModule,
    ReligionModule,
    MasterModule,
    MenuModule,
    UserAccessModule,
    FieldOfWorkUnitModule,
    DoctorScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    CounterGateway,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).exclude('/').forRoutes('*');
  }
}
