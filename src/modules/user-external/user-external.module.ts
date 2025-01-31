import { Module } from '@nestjs/common';
import { UserExternalService } from './user-external.service';
import { UserExternalController } from './user-external.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [UserExternalController],
  providers: [UserExternalService, PrismaService],
})
export class UserExternalModule {}
