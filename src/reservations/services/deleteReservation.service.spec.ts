import { DeleteReservationService } from './deleteReservation.service';

describe('DeleteReservationService', () => {
  const reservationsRepository = { delete: jest.fn() };
  let service: DeleteReservationService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new DeleteReservationService(reservationsRepository as never);
  });

  it('should delete reservation by id', async () => {
    reservationsRepository.delete.mockResolvedValue(undefined);

    await service.execute('r1');

    expect(reservationsRepository.delete).toHaveBeenCalledWith('r1');
  });
});
