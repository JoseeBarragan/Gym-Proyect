import { Inject, Injectable } from '@nestjs/common';
import type { IMembershipRepository } from '../repository/IMemRepository';
import type { ITypeMembershipRepository } from '../../typeMembership/Repository/ITypeMemRepository';

@Injectable()
export class AsignMembershipService {
    constructor(
        @Inject("MembershipRepository") private readonly membershipRepository: IMembershipRepository,
        @Inject("TypeMembershipRepository") private readonly typeMembershipRepository: ITypeMembershipRepository
    ) {}

    async execute (idSocio: string, idTypeMembership: string): Promise<void> {
        const [activeMembership, typeMembership] = await Promise.all([
            this.membershipRepository.getActiveMembership(idSocio),
            this.typeMembershipRepository.getTypeMembershipById(idTypeMembership)
        ]);

        const fechaInicio = activeMembership ? activeMembership.fechaVencimiento : new Date();
        
        const fechaVencimiento = new Date(fechaInicio);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + (typeMembership?.duracionDias ?? 0) );


        return await this.membershipRepository.asignMembership(idSocio, idTypeMembership, {
            fechaInicio: fechaInicio,
            fechaVencimiento: fechaVencimiento
        })
    }
}
