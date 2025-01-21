import { Test, TestingModule } from '@nestjs/testing';
import { UserInternalController } from './user-internal.controller';
import { UserInternalService } from './user-internal.service';

describe('UserInternalController', () => {
  let controller: UserInternalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInternalController],
      providers: [UserInternalService],
    }).compile();

    controller = module.get<UserInternalController>(UserInternalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
