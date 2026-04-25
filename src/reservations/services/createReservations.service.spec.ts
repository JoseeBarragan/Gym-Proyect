import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateReservationsService } from './createReservations.service';

describe('CreateReservationsService', () => {
  const reservationsRepository = {
    getReservationForAClase: jest.fn(),
    create: jest.fn(),
  };
  const membershipRepository = { getActiveMembership: jest.fn() };
  const claseRepository = { getById: jest.fn() };
  let service: CreateReservationsService;

  const dto = {
    idUsuario: '89',
    idClase: 'c0',
    fechaReserva: new Date('2026-01-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreateReservationsService(
      reservationsRepository as never,
      membershipRepository as never,
      claseRepository as never,
    );
  });

  it('should throw if user has no active membership', async () => {
    membershipRepository.getActiveMembership.mockResolvedValue(null);

    await expect(service.execute(dto as never)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('should throw if clase does not exist', async () => {
    membershipRepository.getActiveMembership.mockResolvedValue({ idMembresia: 'm1' });
    claseRepository.getById.mockResolvedValue(null);
    reservationsRepository.getReservationForAClase.mockResolvedValue(0);

    await expect(service.execute(dto as never)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw if class is fully booked', async () => {
    membershipRepository.getActiveMembership.mockResolvedValue({ idMembresia: 'm1' });
    claseRepository.getById.mockResolvedValue({ cupo: 10 });
    reservationsRepository.getReservationForAClase.mockResolvedValue(10);

    await expect(service.execute(dto as never)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });

  it('should create reservation when data is valid', async () => {
    membershipRepository.getActiveMembership.mockResolvedValue({ idMembresia: 'm1' });
    claseRepository.getById.mockResolvedValue({ cupo: 10 });
    reservationsRepository.getReservationForAClase.mockResolvedValue(2);
    reservationsRepository.create.mockResolvedValue(undefined);

    await service.execute(dto as never);

    expect(reservationsRepository.create).toHaveBeenCalledWith(dto);
  });
});
