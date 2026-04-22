import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { IPaymentRepository } from "./IPaymentRepository";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PaymentRepository implements IPaymentRepository {
    constructor(
        private readonly prisma: PrismaService 
    ){}

    async payMembership(idSocio: string, idTypeMembership: string): Promise<void> {
        try{
            await Promise.resolve()
            /* await this.prisma.pago.create({
                data: {
                    
                }
            }) */
            return 
        }catch(err){
            console.log(err)
            throw new ServiceUnavailableException("Error al procesar el pago")
        }
    }
}