import { Inject, Injectable } from '@nestjs/common';
import type { ITypeMembershipRepository } from './Repository/ITypeMemRepository';
import { RedisService } from '../redis/redis.service';
import { TipoMembresia } from '@prisma/client/wasm';

const CACHE_KEY = 'cache:type-memberships'
const CACHE_TTL = 300

@Injectable()
export class GetAllTypeMembershipService {
    constructor(
        @Inject('ITypeMembershipRepository') private typeMembershipRepository: ITypeMembershipRepository,
        private redisService: RedisService
    ) {}
    async execute () {
        const cached = await this.redisService.get(CACHE_KEY)
        if (cached) return (JSON.parse(cached) as TipoMembresia[])

        const data = await this.typeMembershipRepository.getAllTypeMembership()
        await this.redisService.set(CACHE_KEY, JSON.stringify(data), CACHE_TTL)

        return data
        return await this.typeMembershipRepository.getAllTypeMembership();  
    }
}
