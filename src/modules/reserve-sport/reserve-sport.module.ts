import { Module } from '@nestjs/common';
import { ReserveSportService } from './reserve-sport.service';
import { ReserveSportController } from './reserve-sport.controller';

@Module({
  controllers: [ReserveSportController],
  providers: [ReserveSportService],
})
export class ReserveSportModule {}
