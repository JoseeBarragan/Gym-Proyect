import { NotFoundException } from '@nestjs/common';
import { UpdateUserService } from './updateUser.service';

describe('UpdateUserService', () => {
  const userRepository = {
    getProfile: jest.fn(),
    updateUser: jest.fn(),
  };
  const passwordService = { hash: jest.fn() };
  let service: UpdateUserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UpdateUserService(userRepository as never, passwordService as never);
  });

  it('should throw when user is not found', async () => {
    userRepository.getProfile.mockResolvedValue(null);

    await expect(service.execute('u1', { nombre: 'A' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should update user without hashing when password is missing', async () => {
    userRepository.getProfile.mockResolvedValue({ idUsuario: 'u1' });
    userRepository.updateUser.mockResolvedValue({ idUsuario: 'u1', nombre: 'A' });

    const result = await service.execute('u1', { nombre: 'A' });

    expect(passwordService.hash).not.toHaveBeenCalled();
    expect(userRepository.updateUser).toHaveBeenCalledWith('u1', { nombre: 'A' });
    expect(result).toEqual({ idUsuario: 'u1', nombre: 'A' });
  });

  it('should hash password when it is provided', async () => {
    userRepository.getProfile.mockResolvedValue({ idUsuario: 'u1' });
    passwordService.hash.mockResolvedValue('hashed');
    userRepository.updateUser.mockResolvedValue({ idUsuario: 'u1' });

    await service.execute('u1', { contrasena: 'plain' });

    expect(passwordService.hash).toHaveBeenCalledWith('plain');
    expect(userRepository.updateUser).toHaveBeenCalledWith('u1', {
      contrasena: 'hashed',
    });
  });
});
