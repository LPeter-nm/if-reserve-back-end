import { Module } from '@nestjs/common';
import { UserInternalService } from './user-internal.service';
import { UserInternalController } from './user-internal.controller';

@Module({
  controllers: [UserInternalController],
  providers: [UserInternalService],
})
export class UserInternalModule {}
