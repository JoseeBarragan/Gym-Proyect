import { Inject, Injectable } from "@nestjs/common";
import type { IPaymentRepository } from "../repository/IPaymentRepository";

@Injectable()
export class RegisterPaymentService {
    constructor(
        @Inject("IPaymentRepository") private readonly paymentRepository: IPaymentRepository
    ) {}

    async execute(idStripe: string, idMembership: string, monto: number): Promise<void> {
        await this.paymentRepository.registerPayment(idStripe, idMembership, monto);
    }
}