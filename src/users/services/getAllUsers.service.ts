import { Inject, Injectable } from "@nestjs/common";
import type { IUsersRepository } from "../repository/InterfaceRepository";

@Injectable() 
export class GetAllUsersService {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: IUsersRepository
    ){}

    async execute() {
        return await this.userRepository.getAll()
    }
}