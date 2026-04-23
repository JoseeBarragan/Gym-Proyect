import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";


@Injectable()
export class DeleteClaseService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository
    ){}

    async execute(id: string) {
        const existingClase = await this.claseRepository.getById(id);
        if (!existingClase) {
             throw new NotFoundException('Clase no encontrada');
        }

        return await this.claseRepository.delete(id);
    }
}