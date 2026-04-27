export interface IPaymentRepository {
  registerPayment(idStripe: string, idMembership: string, monto: number): Promise<void>;
}