import { Inject, Injectable } from "@nestjs/common";
import type { IReservationsRepository } from "../repository/IReservationsRepository";


@Injectable()
export class GetClaseReservationsService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository
    ) {}

    async execute(idClase: string) {
        return await this.reservationsRepository.getClaseReservations(idClase);
    }
}