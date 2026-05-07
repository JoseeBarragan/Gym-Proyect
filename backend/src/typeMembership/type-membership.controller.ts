import { Controller, Get } from '@nestjs/common';
import { GetAllTypeMembershipService } from './type-membership.service';


@Controller('typeMembership')
export class TypeMembershipController {
  constructor(private readonly getAllTypeMembershipService: GetAllTypeMembershipService) {}

  @Get("")
  async getAll() {
    return this.getAllTypeMembershipService.execute();
  }
}
