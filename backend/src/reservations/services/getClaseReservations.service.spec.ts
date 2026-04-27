import { GetClaseReservationsService } from './getClaseReservations.service';

describe('GetClaseReservationsService', () => {
  const reservationsRepository = { getClaseReservations: jest.fn() };
  let service: GetClaseReservationsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetClaseReservationsService(reservationsRepository as never);
  });

  it('should return reservations for clase', async () => {
    reservationsRepository.getClaseReservations.mockResolvedValue([{ idReserva: '1' }]);

    const result = await service.execute('c1');

    expect(reservationsRepository.getClaseReservations).toHaveBeenCalledWith('c1');
    expect(result).toEqual([{ idReserva: '1' }]);
  });
});
