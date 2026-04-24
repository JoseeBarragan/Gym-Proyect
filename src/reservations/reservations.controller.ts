import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReservationsService } from './services/createReservations.service';
import { CreateResDto } from './dto/CreateRes.dto';
import { Roles } from '../shared/decorators/RoleDecorator';
import { DeleteReservationService } from './services/deleteReservation.service';
import { GetSocioReservationsService } from './services/getSocioReservations.service';
import { GetClaseReservationsService } from './services/getClaseReservations.service';

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
  async create(@Body() reservationData: CreateResDto) {
    await this.createReservationsService.execute(reservationData);
    return { message: 'Reserva creada exitosamente' };
  }

  @Delete("/:id")
  @Roles("Socio")
  async delete(@Param("id") id: string) {
    await this.deleteReservationsService.execute(id);
    return { message: 'Reserva eliminada exitosamente' };
  }

  @Get("/:id")
  @Roles("Socio")
  async getReservationsBySocio(@Param("id") id: string) {
    return await this.getSocioReservationsService.execute(id);
  }

  @Get("clase/:idClase")
  @Roles("Administrador", "Instructor")
  async getReservationsByClase(@Param("idClase") idClase: string) {
    return await this.getClaseReservationsService.execute(idClase);
  }
}
