import { Inject, Injectable } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";
import { CreateClaseDto } from "../dto/clase.dto";
import type { IUsersRepository } from "../../users/repository/InterfaceRepository";


@Injectable()
export class CreateClaseService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository,
        @Inject("UserRepository") private readonly userRepository: IUsersRepository
    ){}

    async execute(claseData: CreateClaseDto) {
        const isInstructor = await this.userRepository.getById(claseData.idInstructor);

        if (!isInstructor || isInstructor.tipoUsuario !== "Instructor") {
            throw new Error('Instructor no encontrado');
        }

        return await this.claseRepository.create(claseData);
    }
}