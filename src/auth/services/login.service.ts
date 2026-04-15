import { Inject, Injectable } from '@nestjs/common';
import { LogInDto } from '../dto/login.dto';
import type { IAuthRepository } from '../repository/Interface';

@Injectable()
export class LogInService {
    constructor(
        @Inject("AuthRepository")
        private readonly authRepository: IAuthRepository
    ){}
    execute(user: LogInDto) {
        // hay que crear una capa de codificado de la contrasena
        return this.authRepository.login(user)
    }
}
