import { Test, TestingModule } from '@nestjs/testing';
import { UserExternalController } from './user-external.controller';
import { UserExternalService } from './user-external.service';

describe('UserExternalController', () => {
  let controller: UserExternalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExternalController],
      providers: [UserExternalService],
    }).compile();

    controller = module.get<UserExternalController>(UserExternalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
