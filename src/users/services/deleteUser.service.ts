import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IUsersRepository } from "../repository/InterfaceRepository";

@Injectable()
export class DeleteUserService {
    constructor(
        @Inject("UserRepository") private readonly userRepository: IUsersRepository
    ){}

    async execute(id: string) {
        const isUser = await this.userRepository.getProfile(id)

        if (!isUser) {
            throw new NotFoundException('Usuario no encontrado')
        }

        return await this.userRepository.deteleUser(id)
    }
}