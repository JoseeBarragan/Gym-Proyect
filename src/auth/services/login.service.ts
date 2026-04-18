import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Usuario } from '@prisma/client';
import { LogInDto } from '../dto/login.dto';
import type { IAuthRepository } from '../repository/Interface';
import type { IUsersRepository } from '../../users/repository/InterfaceRepository';
import { PasswordService } from './Password.service';
import { JWTService } from './JWT.service';

@Injectable()
export class LogInService {
    constructor(
        @Inject("UserRepository") private readonly userRepository: IUsersRepository,
        @Inject("AuthRepository") private readonly authRepository: IAuthRepository,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JWTService
    ){}
    async execute(user: LogInDto): Promise<string> {
        const loggedUser: Usuario | null = await this.authRepository.login(user);

        if (!loggedUser) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const isPasswordValid = await this.passwordService.compare(user.contrasena, loggedUser.contrasena)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const token = this.jwtService.generateAccessToken(loggedUser);

        return token;
    }
}
