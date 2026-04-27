import { Body, Controller, Post } from '@nestjs/common';
import { AsignMembershipService } from './services/AsignMembership.service';
import { Roles } from '../shared/decorators/RoleDecorator';
import { AsignMembershipRequestDto } from './dto/asignMembershipRequest.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Membership')
@ApiBearerAuth()
@Controller('membership')
export class MembershipController {
  constructor(
    private readonly asignMembershipService: AsignMembershipService
  ) {}

  @Roles("Socio")
  @Post("asign")
  @ApiOperation({ summary: 'Asignar membresia', description: 'Asigna una membresia al socio. Si ya tiene una activa, la nueva inicia al vencimiento de la actual.' })
  @ApiBody({ type: AsignMembershipRequestDto })
  @ApiCreatedResponse({
    description: 'Membresia asignada correctamente',
    schema: {
      example: null
    }
  })
  @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
  @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
  @ApiInternalServerErrorResponse({ description: 'Error interno durante asignacion' })
  async asignMembership(@Body() body: AsignMembershipRequestDto) {
     await this.asignMembershipService.execute(body.idSocio, body.idTipoMembresia);
     return
  }
}
