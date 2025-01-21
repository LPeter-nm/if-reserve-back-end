import { Module } from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule'
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserInternalModule } from './modules/user-internal/user-internal.module';
import { UserExternalModule } from './modules/user-external/user-external.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { CaslModule } from './modules/casl/casl.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    ScheduleModule.forRoot(), 
    AuthModule,
    CaslModule, 
    UserModule, 
    UserInternalModule, 
    UserExternalModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [],
})
export class AppModule {}
