import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";
import { UpdateClaseDto } from "../dto/clase.dto";


@Injectable()
export class UpdateClaseService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository
    ){}

    async execute(id: string, claseData: UpdateClaseDto) {
        const existingClase = await this.claseRepository.getById(id);
        if (!existingClase) {
             throw new NotFoundException('Clase no encontrada');
        }
        return await this.claseRepository.update(id, claseData);
    }
}