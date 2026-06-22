import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";
import { UpdateClaseDto } from "../dto/clase.dto";
import { RedisService } from "../../redis/redis.service";


@Injectable()
export class UpdateClaseService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository,
        private readonly redisService: RedisService
    ){}

    async execute(id: string, claseData: UpdateClaseDto) {
        const existingClase = await this.claseRepository.getById(id);
        if (!existingClase) {
             throw new NotFoundException('Clase no encontrada');
        }

        await this.redisService.del('cache:clases');

        return await this.claseRepository.update(id, claseData);
    }
}