import { Test, TestingModule } from '@nestjs/testing';
import { UserExternalService } from './user-external.service';

describe('UserExternalService', () => {
  let service: UserExternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExternalService],
    }).compile();

    service = module.get<UserExternalService>(UserExternalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
