import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../users/dto/user.dto";
import type { IUsersRepository } from "../../users/repository/InterfaceRepository";
import { PasswordService } from "./Password.service";


@Injectable()
export class SignUpService {
    constructor(
        @Inject("UserRepository") private readonly userRepository: IUsersRepository,
        private readonly passwordService: PasswordService
    ){}

    async execute(user: CreateUserDto) {
        const usuario = await this.userRepository.getByEmail(user.email); 
        if (usuario) throw new Error("El usuario ya existe")

        const hashedPassword = await this.passwordService.hash(user.contrasena)
        
        const newUser = {
            ...user,
            contrasena: hashedPassword
        }

        return await this.userRepository.create(newUser)
    }
}