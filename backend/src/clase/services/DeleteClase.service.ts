import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";
import { RedisService } from "../../redis/redis.service";


@Injectable()
export class DeleteClaseService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository,
        private readonly redisService: RedisService
    ){}

    async execute(id: string) {
        const existingClase = await this.claseRepository.getById(id);
        if (!existingClase) {
             throw new NotFoundException('Clase no encontrada');
        }

        await this.redisService.del('cache:clases');

        return await this.claseRepository.delete(id);
    }
}