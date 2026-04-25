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
    async create(reservationData: CreateResDto): Promise<void> {
        try {
            await this.prisma.reserva.create({
                data: {
                    idSocio: reservationData.idUsuario,
                    idClase: reservationData.idClase,
                    fechaReserva: reservationData.fechaReserva,
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
            await this.prisma.reserva.update({
                where: { idReserva: id },
                data: { estadoReserva: "Cancelada" }
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
                where: { idClase, estadoReserva: "Reservada" }
            })
        } catch (err) {
            throw new ServiceUnavailableException('Error al obtener las reservas: ' + err);
        }
    }

    async getReservationForAClase(idClase: string, fechaReserva: Date): Promise<number> {
        try {
            return await this.prisma.reserva.count({
                where: { idClase, fechaReserva, estadoReserva: "Reservada" }
            })
        } catch (err) {
            throw new ServiceUnavailableException('Error al obtener las reservas: ' + err);
        }
    }
}