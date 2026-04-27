import { Inject, Injectable } from "@nestjs/common";
import type { IUsersRepository } from "../repository/InterfaceRepository";


@Injectable()
export class GetProfileService {
    constructor(
        @Inject("UserRepository") private readonly usersRepository: IUsersRepository
    ){}

    async execute(id: string){
        return await this.usersRepository.getProfile(id)
    }
}