import { GetSocioReservationsService } from './getSocioReservations.service';

describe('GetSocioReservationsService', () => {
  const reservationsRepository = { getReservationsBySocio: jest.fn() };
  let service: GetSocioReservationsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetSocioReservationsService(reservationsRepository as never);
  });

  it('should return reservations for socio', async () => {
    reservationsRepository.getReservationsBySocio.mockResolvedValue([{ idReserva: '1' }]);

    const result = await service.execute('u1');

    expect(reservationsRepository.getReservationsBySocio).toHaveBeenCalledWith('u1');
    expect(result).toEqual([{ idReserva: '1' }]);
  });
});
