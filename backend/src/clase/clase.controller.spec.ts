import { ClaseController } from './clase.controller';

describe('ClaseController', () => {
  const getAllClasesService = { execute: jest.fn() };
  const getByIdClaseService = { execute: jest.fn() };
  const createClaseService = { execute: jest.fn() };
  const updateClaseService = { execute: jest.fn() };
  const deleteClaseService = { execute: jest.fn() };
  let controller: ClaseController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ClaseController(
      getAllClasesService as never,
      getByIdClaseService as never,
      createClaseService as never,
      updateClaseService as never,
      deleteClaseService as never,
    );
  });

  it('getClases should return all clases', async () => {
    getAllClasesService.execute.mockResolvedValue([{ idClase: '1' }]);

    const result = await controller.getClases();

    expect(getAllClasesService.execute).toHaveBeenCalled();
    expect(result).toEqual([{ idClase: '1' }]);
  });

  it('getClaseById should return one clase', async () => {
    getByIdClaseService.execute.mockResolvedValue({ idClase: '1' });

    const result = await controller.getClaseById('1');

    expect(getByIdClaseService.execute).toHaveBeenCalledWith('1');
    expect(result).toEqual({ idClase: '1' });
  });

  it('createClase should delegate to service', async () => {
    const dto = { nombre: 'Yoga' };
    createClaseService.execute.mockResolvedValue({ idClase: '1' });

    const result = await controller.createClase(dto as never);

    expect(createClaseService.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ idClase: '1' });
  });

  it('updateClase should delegate to service', async () => {
    const dto = { nombre: 'Pilates' };
    updateClaseService.execute.mockResolvedValue({ idClase: '1' });

    const result = await controller.updateClase('1', dto as never);

    expect(updateClaseService.execute).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual({ idClase: '1' });
  });

  it('deleteClase should delegate to service', async () => {
    deleteClaseService.execute.mockResolvedValue(undefined);

    await controller.deleteClase('1');

    expect(deleteClaseService.execute).toHaveBeenCalledWith('1');
  });
});
