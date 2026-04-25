import { BadRequestException } from '@nestjs/common';
import { HandleWebHookService } from './handleWebHook.service';

describe('HandleWebHookService', () => {
  const constructEvent = jest.fn();
  const stripeService = {
    stripe: {
      webhooks: {
        constructEvent,
      },
    },
  };
  const assignMembershipService = { execute: jest.fn() };
  const registerPaymentService = { execute: jest.fn() };
  let service: HandleWebHookService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new HandleWebHookService(
      stripeService as never,
      assignMembershipService as never,
      registerPaymentService as never,
    );
  });

  it('should throw bad request for invalid signature', async () => {
    constructEvent.mockImplementation(() => {
      throw new Error('invalid');
    });

    await expect(service.execute(Buffer.from('x'), 'sig')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should throw when metadata is missing', async () => {
    constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: { object: {} },
    });

    await expect(service.execute(Buffer.from('x'), 'sig')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should assign membership and register payment', async () => {
    constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          metadata: { idSocio: 's1', idTypeMembership: 'tm1' },
          payment_intent: 'pi_1',
          amount_total: 5000,
        },
      },
    });
    assignMembershipService.execute.mockResolvedValue({ idMembresia: 'm1' });
    registerPaymentService.execute.mockResolvedValue(undefined);

    await service.execute(Buffer.from('x'), 'sig');

    expect(assignMembershipService.execute).toHaveBeenCalledWith('s1', 'tm1');
    expect(registerPaymentService.execute).toHaveBeenCalledWith('pi_1', 'm1', 50);
  });
});
