import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { IReservationsRepository } from '../repository/IReservationsRepository';
import { CreateResDto } from '../dto/CreateRes.dto';
import type { IMembershipRepository } from '../../membership/repository/IMemRepository';
import type { IClasesRepository } from '../../clase/repository/IClasesRepository';

@Injectable()
export class CreateReservationsService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository,
        @Inject("MembershipRepository") private readonly membershipRepository: IMembershipRepository,
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository
    ) {}

    async execute(reservationData: CreateResDto) {
        const activeMembership = await this.membershipRepository.getActiveMembership(reservationData.idUsuario)

        if (!activeMembership) throw new UnprocessableEntityException("User does not have an active membership")

        const [clase, reservationsCount] = await Promise.all([
            this.claseRepository.getById(reservationData.idClase), 
            this.reservationsRepository.getReservationForAClase(reservationData.idClase, reservationData.fechaReserva)
        ])

        if (!clase) throw new NotFoundException("Clase no encontrada");

        if (reservationsCount >= clase.cupo) {
            throw new UnprocessableEntityException("Class is fully booked");
        }

        return await this.reservationsRepository.create(reservationData)
    }
}
