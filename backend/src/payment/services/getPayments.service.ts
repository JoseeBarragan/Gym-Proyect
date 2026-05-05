import { Inject, Injectable } from "@nestjs/common";
import type { IPaymentRepository } from "../repository/IPaymentRepository";

@Injectable()
export class GetPaymentsService {
    constructor(
        @Inject("IPaymentRepository") private readonly paymentRepository: IPaymentRepository
    ){}

    async execute() {
        return await this.paymentRepository.getPayments();
    }
}