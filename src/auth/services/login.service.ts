import { Inject, Injectable } from '@nestjs/common';
import type { Usuario } from '@prisma/client';
import { LogInDto } from '../dto/login.dto';
import type { IAuthRepository } from '../repository/Interface';
import type { IUsersRepository } from '../../users/repository/InterfaceRepository';

@Injectable()
export class LogInService {
    constructor(
        @Inject("UserRepository") private readonly userRepository: IUsersRepository,
        @Inject("AuthRepository") private readonly authRepository: IAuthRepository
    ){}
    async execute(user: LogInDto): Promise<Usuario | null> {
        // const Users = await this.userRepository.getAll()
        // console.log(Users)
        // hay que crear una capa de codificado de la contrasena
        const loggedUser: Usuario | null = await this.authRepository.login(user);

        if (!loggedUser) throw new Error("Usuario no encontrado")

        return loggedUser;
    }
}
