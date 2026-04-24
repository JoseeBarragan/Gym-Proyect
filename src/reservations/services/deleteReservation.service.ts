import { Inject, Injectable } from "@nestjs/common";
import type { IReservationsRepository } from "../repository/IReservationsRepository";

@Injectable()
export class DeleteReservationService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository
    ) {}

    async execute(id: string) {
        return await this.reservationsRepository.delete(id);
    }
}