import { GetProfileService } from './getProfile.service';

describe('GetProfileService', () => {
  const usersRepository = { getProfile: jest.fn() };
  let service: GetProfileService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetProfileService(usersRepository as never);
  });

  it('should return profile by id', async () => {
    usersRepository.getProfile.mockResolvedValue({ idUsuario: 'u1' });

    const result = await service.execute('u1');

    expect(usersRepository.getProfile).toHaveBeenCalledWith('u1');
    expect(result).toEqual({ idUsuario: 'u1' });
  });
});
