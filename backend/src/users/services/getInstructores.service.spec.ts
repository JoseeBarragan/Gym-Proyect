import { GetInstructoresService } from './getInstructores.service';

describe('GetInstructoresService', () => {
  const usersRepository = { getInstructores: jest.fn() };
  let service: GetInstructoresService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetInstructoresService(usersRepository as never);
  });

  it('should return all instructors', async () => {
    usersRepository.getInstructores.mockResolvedValue([{ idUsuario: 'i1' }]);

    const result = await service.execute();

    expect(usersRepository.getInstructores).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ idUsuario: 'i1' }]);
  });
});
