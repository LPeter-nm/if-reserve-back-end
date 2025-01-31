import { Module } from '@nestjs/common';
import { ReserveClassroomService } from './reserve-classroom.service';
import { ReserveClassroomController } from './reserve-classroom.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ReserveClassroomController],
  providers: [ReserveClassroomService, PrismaService],
})
export class ReserveClassroomModule {}
