import { RegisterPaymentService } from './RegisterPayment.service';

describe('RegisterPaymentService', () => {
  const paymentRepository = { registerPayment: jest.fn() };
  let service: RegisterPaymentService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new RegisterPaymentService(paymentRepository as never);
  });

  it('should delegate payment registration to repository', async () => {
    paymentRepository.registerPayment.mockResolvedValue(undefined);

    await service.execute('pi_1', 'm1', 100);

    expect(paymentRepository.registerPayment).toHaveBeenCalledWith('pi_1', 'm1', 100);
  });
});
