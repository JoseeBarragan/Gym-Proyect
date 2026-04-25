import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
  const createPaymentService = { execute: jest.fn() };
  const handleWebhookService = { execute: jest.fn() };
  let controller: PaymentController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new PaymentController(
      createPaymentService as never,
      handleWebhookService as never,
    );
  });

  it('createPayment should delegate to service', async () => {
    createPaymentService.execute.mockResolvedValue('https://checkout.url');

    const result = await controller.createPayment({
      idSocio: 's1',
      idTipoMembresia: 'm1',
    });

    expect(createPaymentService.execute).toHaveBeenCalledWith('s1', 'm1');
    expect(result).toBe('https://checkout.url');
  });

  it('success should return confirmation', () => {
    expect(controller.success()).toEqual({ message: 'Pago exitoso' });
  });

  it('cancel should return cancellation message', () => {
    expect(controller.cancel()).toEqual({ message: 'Pago cancelado' });
  });

  it('webhook should delegate to service', async () => {
    const rawBody = Buffer.from('payload');
    handleWebhookService.execute.mockResolvedValue(undefined);

    await controller.webhook(rawBody, 'sig');

    expect(handleWebhookService.execute).toHaveBeenCalledWith(rawBody, 'sig');
  });
});
