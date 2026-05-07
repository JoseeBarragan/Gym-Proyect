import { Inject, Injectable } from '@nestjs/common';
import type { ITypeMembershipRepository } from './Repository/ITypeMemRepository';

@Injectable()
export class GetAllTypeMembershipService {
    constructor(
        @Inject('ITypeMembershipRepository') private typeMembershipRepository: ITypeMembershipRepository
    ) {}
    async execute () {
        return await this.typeMembershipRepository.getAllTypeMembership();  
    }
}
