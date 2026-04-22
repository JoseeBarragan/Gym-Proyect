import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { IPaymentRepository } from "./IPaymentRepository";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PaymentRepository implements IPaymentRepository {
    constructor(
        private readonly prisma: PrismaService 
    ){}

    async registerPayment(idStripe: string, idMembership: string, monto: number): Promise<void> {
        try{
            await this.prisma.pago.create({
                data: {
                    stripePaymentId: idStripe,
                    idMembresia: idMembership,
                    monto: monto,
                    fechaPago: new Date(),
                    estadoPago: "Completado"
                }
            })
            return 
        }catch(err){
            console.log(err)
            throw new ServiceUnavailableException("Error al procesar el pago")
        }
    }
} 