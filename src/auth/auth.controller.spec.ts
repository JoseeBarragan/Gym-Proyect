import { AuthController } from './auth.controller';
import { LogInDto } from './dto/login.dto';

describe('AuthController', () => {
  const logInService = { execute: jest.fn() };
  const signUpService = { execute: jest.fn() };
  let controller: AuthController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthController(logInService as never, signUpService as never);
  });

  it('logIn should set cookie and send token', async () => {
    const dto: LogInDto = { email: 'a@a.com', contrasena: '1234' };
    logInService.execute.mockResolvedValue('jwt-token');

    const send = jest.fn();
    const cookie = jest.fn().mockReturnValue({ send });
    const res = { cookie };

    await controller.logIn(dto, res as never);

    expect(logInService.execute).toHaveBeenCalledWith(dto);
    expect(cookie).toHaveBeenCalledWith(
      'access_token',
      'jwt-token',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }),
    );
    expect(send).toHaveBeenCalledWith({ token: 'jwt-token' });
  });

  it('signUp should delegate to service', async () => {
    const dto = {
      email: 'new@user.com',
      contrasena: 'abc',
      nombre: 'John',
      apellido: 'Doe',
      telefono: '123',
      tipoUsuario: 'Socio',
    };
    signUpService.execute.mockResolvedValue({ id: '1' });

    const result = await controller.signUp(dto as never);

    expect(signUpService.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: '1' });
  });
});
