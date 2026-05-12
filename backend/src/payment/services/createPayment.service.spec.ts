import { NotFoundException } from '@nestjs/common';
import { CreatePaymentService } from './createPayment.service';

describe('CreatePaymentService', () => {
  const typeMembershipRepository = { getTypeMembershipById: jest.fn() };
  const usersRepository = { getByEmail: jest.fn() };
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
      usersRepository as never,
    );
  });

  it('should throw if membership type does not exist', async () => {
    usersRepository.getByEmail.mockResolvedValue({ idUsuario: 'u1' });
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue(null);

    await expect(service.execute('test@email.com', 'tm1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw if stripe session has no url', async () => {
    usersRepository.getByEmail.mockResolvedValue({ idUsuario: 'u1' });
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue({
      nombre: 'Premium',
      precio: 100,
    });
    createSession.mockResolvedValue({ url: null });

    await expect(service.execute('test@email.com', 'tm1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should return checkout url', async () => {
    usersRepository.getByEmail.mockResolvedValue({ idUsuario: 'u1' });
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue({
      nombre: 'Premium',
      precio: 100,
    });
    createSession.mockResolvedValue({ url: 'https://checkout.stripe.com/session' });

    const result = await service.execute('test@email.com', 'tm1');

    expect(createSession).toHaveBeenCalled();
    expect(result).toBe('"https://checkout.stripe.com/session"');
  });
});
