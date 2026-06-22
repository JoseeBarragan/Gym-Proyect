import { Inject, Injectable } from "@nestjs/common";
import type { IClasesRepository } from "../repository/IClasesRepository";
import { Clase } from "@prisma/client";
import { RedisService } from "../../redis/redis.service";

const CACHE_KEY = 'cache:clases';
const CACHE_TTL = 300;

@Injectable()
export class GetAllClasesService {
    constructor(
        @Inject("ClasesRepository") private readonly claseRepository: IClasesRepository,
        private readonly redisService: RedisService
    ){}

    async execute(): Promise<Clase[]> {
        const cached = await this.redisService.get(CACHE_KEY);
        if (cached) {
            return JSON.parse(cached) as Clase[];
        }

        const data = await this.claseRepository.getAll();
        await this.redisService.set(CACHE_KEY, JSON.stringify(data), CACHE_TTL);

        return data;
    }
}