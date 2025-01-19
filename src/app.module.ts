import { Module } from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule'
import {ConfigModule} from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    ScheduleModule.forRoot()
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
