import { Test, TestingModule } from '@nestjs/testing';
import { UserInternalService } from './user-internal.service';

describe('UserInternalService', () => {
  let service: UserInternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInternalService],
    }).compile();

    service = module.get<UserInternalService>(UserInternalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
