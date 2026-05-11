import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { IReservationsRepository } from "./IReservationsRepository";
import { CreateResDto } from "../dto/CreateRes.dto";
import { PrismaService } from "../../prisma.service";
import { Reserva } from "@prisma/client";

@Injectable()
export class ReservationRepository implements IReservationsRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}
    async create(idSocio: string, reservationData: CreateResDto): Promise<void> {
        try {
            await this.prisma.reserva.create({
                data: {
                    idSocio,
                    idClase: reservationData.idClase,
                    estadoReserva: "Reservada"
                }
            })
            return
        } catch (err) {
            throw new ServiceUnavailableException('Error al crear la reserva: ' + err);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.reserva.delete({
                where: { idReserva: id }
            })
            return
        } catch (err) {
            throw new ServiceUnavailableException('Error al eliminar la reserva: ' + err);
        }
    }

    async getReservationsBySocio(idSocio: string): Promise<Reserva[]> {
        try {
            return await this.prisma.reserva.findMany({
                where: { idSocio },
            })
        } catch (err) {
            throw new ServiceUnavailableException('Error al obtener las reservas: ' + err);
        }
    }

    async getClaseReservations(idClase: string): Promise<Reserva[]> {
        try {
            return await this.prisma.reserva.findMany({
                where: { idClase, estadoReserva: "Reservada" },
                include: {
                    Usuario: {
                        select: {
                            idUsuario: true,
                            nombre: true,
                            apellido: true,
                            email: true,      
                        }
                    }
                }
            })
        } catch (err) {
            throw new ServiceUnavailableException('Error al obtener las reservas: ' + err);
        }
    }

  async getReservationForAClase(idClase: string): Promise<number> {
    try {
      return await this.prisma.reserva.count({
        where: { idClase, estadoReserva: "Reservada" }
      })
    } catch (err) {
      throw new ServiceUnavailableException('Error al obtener las reservas: ' + err);
    }
  }

  async getReservationById(idReserva: string): Promise<Reserva | null> {
    try {
      return await this.prisma.reserva.findUnique({
        where: { idReserva }
      })
    } catch (err) {
      throw new ServiceUnavailableException('Error al obtener la reserva: ' + err);
    }
  }

  async updateAttendance(idReserva: string, asistencia: boolean | null): Promise<Reserva> {
    try {
      return await this.prisma.reserva.update({
        where: { idReserva },
        data: { asistencia }
      })
    } catch (err) {
      throw new ServiceUnavailableException('Error al actualizar la asistencia: ' + err);
    }
  }
}