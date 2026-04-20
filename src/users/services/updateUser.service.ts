import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "../dto/user.dto";
import type { IUsersRepository } from "../repository/InterfaceRepository";
import { PasswordService } from "../../auth/services/Password.service";


@Injectable()
export class UpdateUserService {
    constructor(
        @Inject("UserRepository") private readonly userRepository: IUsersRepository,
        private readonly passwordService: PasswordService
    ){}

    async execute(id: string, user: UpdateUserDto) {
        const isUser = await this.userRepository.getProfile(id)

        if (!isUser) {
            throw new NotFoundException('Usuario no encontrado')
        }

        let updatedUser = {
            ...user
        }

        if (user.contrasena) {
            const hashedPassword = await this.passwordService.hash(user.contrasena)

            updatedUser = {
                ...updatedUser,
                contrasena: hashedPassword
            }
        }

        return await this.userRepository.updateUser(id, updatedUser)
    }
}