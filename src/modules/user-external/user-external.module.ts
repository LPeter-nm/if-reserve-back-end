import { Module } from '@nestjs/common';
import { UserExternalService } from './user-external.service';
import { UserExternalController } from './user-external.controller';

@Module({
  controllers: [UserExternalController],
  providers: [UserExternalService],
})
export class UserExternalModule {}
