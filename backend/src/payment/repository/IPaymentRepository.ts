import { Pago } from "@prisma/client";

export interface IPaymentRepository {
  registerPayment(idStripe: string, idMembership: string, monto: number): Promise<void>;
  getPayments(): Promise<Pago[]>;
}