import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IReservationsRepository } from "../repository/IReservationsRepository";
import type { IUsersRepository } from "../../users/repository/InterfaceRepository";


@Injectable()
export class GetSocioReservationsService {
    constructor(
        @Inject("ReservationsRepository") private readonly reservationsRepository: IReservationsRepository,
        @Inject("UsersRepository") private readonly usersRepository: IUsersRepository
    ) {}

    async execute(email: string) {
        const user = await this.usersRepository.getByEmail(email);
        
        if (!user) {
            throw new NotFoundException("Usuario no encontrado");
        }
        
        return await this.reservationsRepository.getReservationsBySocio(user.idUsuario);
    }
}