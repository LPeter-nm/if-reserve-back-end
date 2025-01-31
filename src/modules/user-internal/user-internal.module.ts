import { Module } from '@nestjs/common';
import { UserInternalService } from './user-internal.service';
import { UserInternalController } from './user-internal.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [UserInternalController],
  providers: [UserInternalService, PrismaService],
})
export class UserInternalModule {}
