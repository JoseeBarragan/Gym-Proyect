import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { IMembershipRepository } from "./IMemRepository";
import { PrismaService } from "../../prisma.service";
import { CreateMemberShipDto } from "../dto/CreateMemShip.dto";
import { Membresia } from "@prisma/client";

@Injectable()
export class MembershipRepository implements IMembershipRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async asignMembership(idSocio: string, idTypeMembership: string, membershipData: CreateMemberShipDto): Promise<void> {
        try {
            await this.prisma.membresia.create({
                data: {
                    idSocio: idSocio,
                    idTipoMembresia: idTypeMembership,
                    fechaInico: membershipData.fechaInicio,
                    fechaVencimiento: membershipData.fechaVencimiento,
                    estadoMembresia: "Activa"
                }
            })
            return
        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException("Error while asigning membership");
        }
    }

    async getActiveMembership(id: string): Promise<Membresia | null>{
        try {
            const activeMembership = await this.prisma.membresia.findFirst({
                where: {
                    idSocio: id,
                    estadoMembresia: "Activa"
                }
            })
            return activeMembership
        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException("Error while fetching active membership");
        }
    }
}
