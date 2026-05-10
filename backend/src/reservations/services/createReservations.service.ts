import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import type { IReservationsRepository } from '../repository/IReservationsRepository';
import { CreateResDto } from '../dto/CreateRes.dto';
import type { IMembershipRepository } from '../../membership/repository/IMemRepository';
import type { IClasesRepository } from '../../clase/repository/IClasesRepository';
import type { IUsersRepository } from '../../users/repository/InterfaceRepository';

@Injectable()
export class CreateReservationsService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository,
        @Inject("MembershipRepository") private readonly membershipRepository: IMembershipRepository,
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository,
        @Inject("UsersRepository") private readonly usersRepository: IUsersRepository
    ) {}

    async execute(reservationData: CreateResDto) {
        const user = await this.usersRepository.getByEmail(reservationData.email);

        if (!user) {
            throw new NotFoundException("Usuario no encontrado");
        }

        const activeMembership = await this.membershipRepository.getActiveMembership(user.idUsuario);

        if (!activeMembership) throw new UnprocessableEntityException("User does not have an active membership")

        const [clase, reservationsCount] = await Promise.all([
            this.claseRepository.getById(reservationData.idClase), 
            this.reservationsRepository.getReservationForAClase(reservationData.idClase)
        ])

        if (!clase) throw new NotFoundException("Clase no encontrada");

        if (reservationsCount >= clase.cupo) {
            throw new UnprocessableEntityException("Class is fully booked");
        }

        return await this.reservationsRepository.create(user.idUsuario, reservationData)
    }
}
