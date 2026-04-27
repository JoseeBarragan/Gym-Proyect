import { ReservationsController } from './reservations.controller';

describe('ReservationsController', () => {
  const createReservationsService = { execute: jest.fn() };
  const deleteReservationsService = { execute: jest.fn() };
  const getSocioReservationsService = { execute: jest.fn() };
  const getClaseReservationsService = { execute: jest.fn() };
  let controller: ReservationsController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ReservationsController(
      createReservationsService as never,
      deleteReservationsService as never,
      getSocioReservationsService as never,
      getClaseReservationsService as never,
    );
  });

  it('create should call service and return message', async () => {
    createReservationsService.execute.mockResolvedValue(undefined);

    const result = await controller.create({} as never);

    expect(createReservationsService.execute).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Reserva creada exitosamente' });
  });

  it('delete should call service and return message', async () => {
    deleteReservationsService.execute.mockResolvedValue(undefined);

    const result = await controller.delete('r1');

    expect(deleteReservationsService.execute).toHaveBeenCalledWith('r1');
    expect(result).toEqual({ message: 'Reserva eliminada exitosamente' });
  });

  it('getReservationsBySocio should delegate to service', async () => {
    getSocioReservationsService.execute.mockResolvedValue([{ idReserva: '1' }]);

    const result = await controller.getReservationsBySocio('u1');

    expect(getSocioReservationsService.execute).toHaveBeenCalledWith('u1');
    expect(result).toEqual([{ idReserva: '1' }]);
  });

  it('getReservationsByClase should delegate to service', async () => {
    getClaseReservationsService.execute.mockResolvedValue([{ idReserva: '1' }]);

    const result = await controller.getReservationsByClase('c1');

    expect(getClaseReservationsService.execute).toHaveBeenCalledWith('c1');
    expect(result).toEqual([{ idReserva: '1' }]);
  });
});
