import { TipoMembresia } from "@prisma/client";

export interface ITypeMembershipRepository {
    getTypeMembershipById(id: string): Promise<TipoMembresia | null>;
}