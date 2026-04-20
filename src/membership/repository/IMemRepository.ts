import { Membresia } from "@prisma/client";
import { CreateMemberShipDto } from "../dto/CreateMemShip.dto";

export interface IMembershipRepository {
    asignMembership(idSocio: string, idTypeMembership: string, membershipData: CreateMemberShipDto): Promise<void>;
    getActiveMembership(id: string): Promise<Membresia| null>;
}