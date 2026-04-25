import { NotFoundException } from '@nestjs/common';
import { DeleteUserService } from './deleteUser.service';

describe('DeleteUserService', () => {
  const userRepository = {
    getProfile: jest.fn(),
    deleteUser: jest.fn(),
  };
  let service: DeleteUserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new DeleteUserService(userRepository as never);
  });

  it('should throw when user does not exist', async () => {
    userRepository.getProfile.mockResolvedValue(null);

    await expect(service.execute('u1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should delete user', async () => {
    userRepository.getProfile.mockResolvedValue({ idUsuario: 'u1' });
    userRepository.deleteUser.mockResolvedValue(undefined);

    await service.execute('u1');

    expect(userRepository.deleteUser).toHaveBeenCalledWith('u1');
  });
});
