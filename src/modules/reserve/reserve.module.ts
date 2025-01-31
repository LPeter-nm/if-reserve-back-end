import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, PrismaService],
})
export class ReserveModule {}
