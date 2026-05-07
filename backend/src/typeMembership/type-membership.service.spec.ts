import { Test, TestingModule } from '@nestjs/testing';
import { GetAllTypeMembershipService } from './type-membership.service';

describe('GetAllTypeMembershipService', () => {
  let service: GetAllTypeMembershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllTypeMembershipService],
    }).compile();

    service = module.get<GetAllTypeMembershipService>(GetAllTypeMembershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
