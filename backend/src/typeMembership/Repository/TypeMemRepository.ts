import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { ITypeMembershipRepository } from "./ITypeMemRepository";

@Injectable()
export class TypeMembershipRepository implements ITypeMembershipRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getTypeMembershipById(id: string) {
        try {
            const typeMembership = await this.prisma.tipoMembresia.findUnique({
                where: {
                    idTipoMembresia: id
                }
            })
            return typeMembership
        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException("Error while fetching type membership by id");
        }
    }

    async getAllTypeMembership() {
        try {
            return await this.prisma.tipoMembresia.findMany()
        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException("Error while fetching all type memberships");
        }
    }
}