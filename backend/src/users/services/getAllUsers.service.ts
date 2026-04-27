import { Inject, Injectable } from "@nestjs/common";
import type { IUsersRepository } from "../repository/InterfaceRepository";
import { TipoUsuario } from "../dto/user.dto";

@Injectable() 
export class GetAllUsersService {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: IUsersRepository
    ){}

    async execute(tipoUsuario?: TipoUsuario) {
        return await this.userRepository.getAll(tipoUsuario)
    }
}