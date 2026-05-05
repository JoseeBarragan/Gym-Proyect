import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IReservationsRepository } from "../repository/IReservationsRepository";

@Injectable()
export class UpdateReservationAttendanceService {
  constructor(
    @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository
  ) {}

  async execute(idReserva: string, asistencia: boolean | null) {
    const reservation = await this.reservationsRepository.getReservationById(idReserva);
    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }
    return await this.reservationsRepository.updateAttendance(idReserva, asistencia);
  }
}
