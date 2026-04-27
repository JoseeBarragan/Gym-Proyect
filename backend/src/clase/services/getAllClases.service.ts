import { Inject, Injectable } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";
import { Clase } from "@prisma/client";


@Injectable()
export class GetAllClasesService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository
    ){}

    async execute(): Promise<Clase[]> {
        return await this.claseRepository.getAll();
    }
}