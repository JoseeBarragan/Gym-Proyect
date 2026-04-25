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

    async asignMembership(idSocio: string, idTypeMembership: string, membershipData: CreateMemberShipDto): Promise<Membresia> {
        try {
            return await this.prisma.membresia.create({
                data: {
                    idSocio: idSocio,
                    idTipoMembresia: idTypeMembership,
                    fechaInico: membershipData.fechaInicio,
                    fechaVencimiento: membershipData.fechaVencimiento,
                    estadoMembresia: "Activa"
                }
            })
        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException("Error while asigning membership");
        }
    }

    async getActiveMembership(id: string): Promise<Membresia | null>{
        try {
            const today = new Date();

            await this.prisma.membresia.updateMany({
                where: {
                    idSocio: id,
                    fechaVencimiento: { lt: today },
                    estadoMembresia: "Activa"
                },
                data: { estadoMembresia: "Expirada" }
            });

            return await this.prisma.membresia.findFirst({
                where: {
                    idSocio: id,
                    estadoMembresia: "Activa"
                }
            });
        } catch (error) {
            console.log(error)
            throw new ServiceUnavailableException("Error while fetching active membership");
        }
    }

    async 
}
