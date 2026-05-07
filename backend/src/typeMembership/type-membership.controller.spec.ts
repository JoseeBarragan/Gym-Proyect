import { Test, TestingModule } from '@nestjs/testing';
import { TypeMembershipController } from './type-membership.controller';
import { GetAllTypeMembershipService } from './type-membership.service';

describe('TypeMembershipController', () => {
  let controller: TypeMembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeMembershipController],
      providers: [GetAllTypeMembershipService],
    }).compile();

    controller = module.get<TypeMembershipController>(TypeMembershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
