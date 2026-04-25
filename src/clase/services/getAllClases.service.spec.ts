import { GetAllClasesService } from './getAllClases.service';

describe('GetAllClasesService', () => {
  const claseRepository = { getAll: jest.fn() };
  let service: GetAllClasesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetAllClasesService(claseRepository as never);
  });

  it('should return all clases', async () => {
    claseRepository.getAll.mockResolvedValue([{ idClase: '1' }]);

    const result = await service.execute();

    expect(claseRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([{ idClase: '1' }]);
  });
});
