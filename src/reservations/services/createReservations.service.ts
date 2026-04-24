import { Inject, Injectable } from '@nestjs/common';
import type { IReservationsRepository } from '../repository/IReservationsRepository';
import { CreateResDto } from '../dto/CreateRes.dto';

@Injectable()
export class CreateReservationsService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository
    ) {}

    async execute(reservationData: CreateResDto) {
        return await this.reservationsRepository.create(reservationData)
    }
}
