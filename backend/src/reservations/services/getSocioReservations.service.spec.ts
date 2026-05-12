import { GetSocioReservationsService } from './getSocioReservations.service';

describe('GetSocioReservationsService', () => {
  const reservationsRepository = { getReservationsBySocio: jest.fn() };
  const usersRepository = { getByEmail: jest.fn() };
  let service: GetSocioReservationsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetSocioReservationsService(reservationsRepository as never, usersRepository as never);
  });

  it('should return reservations for socio', async () => {
    usersRepository.getByEmail.mockResolvedValue({ idUsuario: 'u1' });
    reservationsRepository.getReservationsBySocio.mockResolvedValue([{ idReserva: '1' }]);

    const result = await service.execute('test@email.com');

    expect(usersRepository.getByEmail).toHaveBeenCalledWith('test@email.com');
    expect(reservationsRepository.getReservationsBySocio).toHaveBeenCalledWith('u1');
    expect(result).toEqual([{ idReserva: '1' }]);
  });
});
