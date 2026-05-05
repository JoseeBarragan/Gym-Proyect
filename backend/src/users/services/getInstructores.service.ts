import { Inject, Injectable } from "@nestjs/common";
import { Usuario } from "../../generated/prisma/client";
import type { IUsersRepository } from "../repository/InterfaceRepository";

@Injectable()
export class GetInstructoresService {
    constructor(
        @Inject("UserRepository") private readonly usersRepository: IUsersRepository
    ){}

    async execute(): Promise<Usuario[]> {
        return await this.usersRepository.getInstructores();
    }
}