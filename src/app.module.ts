import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserInternalModule } from './modules/user-internal/user-internal.module';
import { UserExternalModule } from './modules/user-external/user-external.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { CaslModule } from './modules/casl/casl.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/PrismaService';
import { ReserveModule } from './modules/reserve/reserve.module';
import { ReserveSportModule } from './modules/reserve-sport/reserve-sport.module';
import { ReserveClassroomModule } from './modules/reserve-classroom/reserve-classroom.module';
import { ReserveEventModule } from './modules/reserve-event/reserve-event.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CaslModule,
    AuthModule,
    UserModule,
    UserInternalModule,
    UserExternalModule,
    ReserveModule,
    ReserveSportModule,
    ReserveClassroomModule,
    ReserveEventModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    PrismaService,
  ],
  controllers: [AppController],
})
export class AppModule {}
