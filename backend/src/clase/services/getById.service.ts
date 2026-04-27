import { Inject, Injectable } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";


@Injectable()
export class GetByIdClaseService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository
    ){}

    async execute(id: string) {
        return await this.claseRepository.getById(id);
    }
}