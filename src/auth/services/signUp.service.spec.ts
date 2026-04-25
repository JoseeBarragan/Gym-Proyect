import { ConflictException } from '@nestjs/common';
import { SignUpService } from './signUp.service';

describe('SignUpService', () => {
  const userRepository = {
    getByEmail: jest.fn(),
    create: jest.fn(),
  };
  const passwordService = { hash: jest.fn() };
  let service: SignUpService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SignUpService(userRepository as never, passwordService as never);
  });

  it('should throw when user already exists', async () => {
    userRepository.getByEmail.mockResolvedValue({ idUsuario: '1' });

    await expect(
      service.execute({ email: 'existing@mail.com' } as never),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('should hash password and create user', async () => {
    const dto = {
      email: 'new@mail.com',
      contrasena: 'plain',
      nombre: 'A',
      apellido: 'B',
      telefono: '123',
      tipoUsuario: 'Socio',
    };

    userRepository.getByEmail.mockResolvedValue(null);
    passwordService.hash.mockResolvedValue('hashed');
    userRepository.create.mockResolvedValue({ idUsuario: '1' });

    const result = await service.execute(dto as never);

    expect(passwordService.hash).toHaveBeenCalledWith('plain');
    expect(userRepository.create).toHaveBeenCalledWith({
      ...dto,
      contrasena: 'hashed',
    });
    expect(result).toEqual({ idUsuario: '1' });
  });
});
