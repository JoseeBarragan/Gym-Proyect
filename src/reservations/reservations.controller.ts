import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReservationsService } from './services/createReservations.service';
import { CreateResDto } from './dto/CreateRes.dto';
import { Roles } from '../shared/decorators/RoleDecorator';
import { DeleteReservationService } from './services/deleteReservation.service';
import { GetSocioReservationsService } from './services/getSocioReservations.service';
import { GetClaseReservationsService } from './services/getClaseReservations.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Reservations')
@ApiBearerAuth()
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly deleteReservationsService: DeleteReservationService,
    private readonly getSocioReservationsService: GetSocioReservationsService,
    private readonly getClaseReservationsService: GetClaseReservationsService
  ) {}

  @Post()
  @Roles("Socio")
  @ApiOperation({ summary: 'Crear reserva', description: 'Crea una reserva para una clase si el socio tiene membresia activa y hay cupo disponible.' })
  @ApiBody({ type: CreateResDto })
  @ApiOkResponse({
    description: 'Reserva creada',
    schema: {
      example: {
        message: 'Reserva creada exitosamente'
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Clase no encontrada' })
  @ApiUnprocessableEntityResponse({ description: 'Sin membresia activa o clase sin cupo' })
  @ApiBadRequestResponse({ description: 'Error de validacion de datos de entrada' })
  @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
  @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
  async create(@Body() reservationData: CreateResDto) {
    await this.createReservationsService.execute(reservationData);
    return { message: 'Reserva creada exitosamente' };
  }

  @Delete("/:id")
  @Roles("Socio")
  @ApiOperation({ summary: 'Cancelar reserva', description: 'Cancela una reserva cambiando estado a Cancelada.' })
  @ApiParam({ name: 'id', example: '4a307c9b-383a-42fc-b772-5c8a55c3d731' })
  @ApiOkResponse({
    description: 'Reserva cancelada',
    schema: {
      example: {
        message: 'Reserva eliminada exitosamente'
      }
    }
  })
  @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
  @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
  async delete(@Param("id") id: string) {
    await this.deleteReservationsService.execute(id);
    return { message: 'Reserva eliminada exitosamente' };
  }

  @Get("/:id")
  @Roles("Socio")
  @ApiOperation({ summary: 'Listar reservas por socio', description: 'Obtiene todas las reservas de un socio.' })
  @ApiParam({ name: 'id', example: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2' })
  @ApiOkResponse({
    description: 'Reservas del socio',
    schema: {
      example: [
        {
          idReserva: '4a307c9b-383a-42fc-b772-5c8a55c3d731',
          idClase: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5',
          idSocio: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2',
          fechaReserva: '2026-05-01T00:00:00.000Z',
          estadoReserva: 'Reservada'
        }
      ]
    }
  })
  @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
  @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
  async getReservationsBySocio(@Param("id") id: string) {
    return await this.getSocioReservationsService.execute(id);
  }

  @Get("clase/:idClase")
  @Roles("Administrador", "Instructor")
  @ApiOperation({ summary: 'Listar reservas por clase', description: 'Obtiene reservas activas (Reservada) para una clase.' })
  @ApiParam({ name: 'idClase', example: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5' })
  @ApiOkResponse({
    description: 'Reservas de la clase',
    schema: {
      example: [
        {
          idReserva: '4a307c9b-383a-42fc-b772-5c8a55c3d731',
          idClase: '3b4b340d-6cb4-42eb-a35e-bec0ca2516f5',
          idSocio: 'f4a42766-c4e1-4c9b-a290-9b8562a3a3f2',
          fechaReserva: '2026-05-01T00:00:00.000Z',
          estadoReserva: 'Reservada'
        }
      ]
    }
  })
  @ApiForbiddenResponse({ description: 'No tenes permisos para esta accion' })
  @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
  async getReservationsByClase(@Param("idClase") idClase: string) {
    return await this.getClaseReservationsService.execute(idClase);
  }
}
