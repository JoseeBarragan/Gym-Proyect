import { UnauthorizedException } from '@nestjs/common';
import { LogInService } from './login.service';

describe('LogInService', () => {
  const authRepository = { login: jest.fn() };
  const passwordService = { compare: jest.fn() };
  const jwtService = { generateAccessToken: jest.fn() };
  let service: LogInService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new LogInService(
      authRepository as never,
      passwordService as never,
      jwtService as never,
    );
  });

  it('should throw when user does not exist', async () => {
    authRepository.login.mockResolvedValue(null);

    await expect(
      service.execute({ email: 'a@a.com', contrasena: '123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should throw when password is invalid', async () => {
    authRepository.login.mockResolvedValue({ contrasena: 'hash' });
    passwordService.compare.mockResolvedValue(false);

    await expect(
      service.execute({ email: 'a@a.com', contrasena: '123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should return token when credentials are valid', async () => {
    const user = {
      email: 'a@a.com',
      contrasena: 'hash',
      nombre: 'John',
      apellido: 'Doe',
      tipoUsuario: 'Socio',
    };

    authRepository.login.mockResolvedValue(user);
    passwordService.compare.mockResolvedValue(true);
    jwtService.generateAccessToken.mockReturnValue('token-123');

    const token = await service.execute({ email: 'a@a.com', contrasena: '123' });

    expect(passwordService.compare).toHaveBeenCalledWith('123', 'hash');
    expect(jwtService.generateAccessToken).toHaveBeenCalledWith(user);
    expect(token).toBe('token-123');
  });
});
