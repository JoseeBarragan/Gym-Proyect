import { GetAllUsersService } from './getAllUsers.service';
import { TipoUsuario } from '../dto/user.dto';

describe('GetAllUsersService', () => {
  const userRepository = { getAll: jest.fn() };
  let service: GetAllUsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GetAllUsersService(userRepository as never);
  });

  it('should return all users', async () => {
    userRepository.getAll.mockResolvedValue([{ idUsuario: '1' }]);

    const result = await service.execute();

    expect(userRepository.getAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual([{ idUsuario: '1' }]);
  });

  it('should filter by tipoUsuario', async () => {
    userRepository.getAll.mockResolvedValue([{ idUsuario: '2' }]);

    const result = await service.execute(TipoUsuario.SOCIO);

    expect(userRepository.getAll).toHaveBeenCalledWith(TipoUsuario.SOCIO);
    expect(result).toEqual([{ idUsuario: '2' }]);
  });
});
