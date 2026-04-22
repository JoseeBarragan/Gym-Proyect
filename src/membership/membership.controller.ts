import { Body, Controller, Post } from '@nestjs/common';
import { AsignMembershipService } from './services/AsignMembership.service';
import { Roles } from '../shared/decorators/RoleDecorator';

@Controller('membership')
export class MembershipController {
  constructor(
    private readonly asignMembershipService: AsignMembershipService
  ) {}

  @Roles("Socio")
  @Post("asign")
  async asignMembership(@Body() body: { idSocio: string, idTipoMembresia: string }) {
     await this.asignMembershipService.execute(body.idSocio, body.idTipoMembresia);
     return
  }
}
