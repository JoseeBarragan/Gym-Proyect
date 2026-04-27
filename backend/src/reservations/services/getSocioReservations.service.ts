import { Inject, Injectable } from "@nestjs/common";
import type { IReservationsRepository } from "../repository/IReservationsRepository";


@Injectable()
export class GetSocioReservationsService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository
    ) {}

    async execute(idSocio: string) {
        return await this.reservationsRepository.getReservationsBySocio(idSocio);
    }
}