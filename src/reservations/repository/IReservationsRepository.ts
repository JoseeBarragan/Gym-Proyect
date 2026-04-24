import { Reserva } from "@prisma/client";
import { CreateResDto } from "../dto/CreateRes.dto";

export interface IReservationsRepository {
    create(reservationData: CreateResDto): Promise<void>;
    delete(id: string): Promise<void>;
    getReservationsBySocio(idSocio: string): Promise<Reserva[]>;
    getClaseReservations(idClase: string): Promise<Reserva[]>;
}