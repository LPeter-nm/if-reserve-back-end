import { Module } from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule'
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserInternalModule } from './modules/user-internal/user-internal.module';
import { UserExternalModule } from './modules/user-external/user-external.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    ScheduleModule.forRoot(), 
    AuthModule, 
    UserModule, 
    UserInternalModule, 
    UserExternalModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
