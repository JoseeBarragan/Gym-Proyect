import { NotFoundException } from '@nestjs/common';
import { CreatePaymentService } from './createPayment.service';

describe('CreatePaymentService', () => {
  const typeMembershipRepository = { getTypeMembershipById: jest.fn() };
  const createSession = jest.fn();
  const stripeService = {
    stripe: {
      checkout: {
        sessions: {
          create: createSession,
        },
      },
    },
  };
  let service: CreatePaymentService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreatePaymentService(
      typeMembershipRepository as never,
      stripeService as never,
    );
  });

  it('should throw if membership type does not exist', async () => {
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue(null);

    await expect(service.execute('s1', 'tm1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw if stripe session has no url', async () => {
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue({
      nombre: 'Premium',
      precio: 100,
    });
    createSession.mockResolvedValue({ url: null });

    await expect(service.execute('s1', 'tm1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should return checkout url', async () => {
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue({
      nombre: 'Premium',
      precio: 100,
    });
    createSession.mockResolvedValue({ url: 'https://checkout.stripe.com/session' });

    const result = await service.execute('s1', 'tm1');

    expect(createSession).toHaveBeenCalled();
    expect(result).toBe('https://checkout.stripe.com/session');
  });
});
