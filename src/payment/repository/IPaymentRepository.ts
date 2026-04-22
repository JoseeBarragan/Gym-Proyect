export interface IPaymentRepository {
  payMembership(idSocio: string, idTypeMembership: string): Promise<void>;
}