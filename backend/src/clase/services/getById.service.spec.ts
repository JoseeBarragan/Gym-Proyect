import { GetByIdClaseService } from './getById.service';

describe('GetByIdClaseService', () => {
  const claseRepository = { getById: jest.fn() };
  let service: GetByIdClaseService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetByIdClaseService(claseRepository as never);
  });

  it('should return clase by id', async () => {
    claseRepository.getById.mockResolvedValue({ idClase: '1' });

    const result = await service.execute('1');

    expect(claseRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual({ idClase: '1' });
  });
});
