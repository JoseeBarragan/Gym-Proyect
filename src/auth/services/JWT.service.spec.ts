import { JWTService } from './JWT.service';

describe('JWTService', () => {
  let service: JWTService;

  beforeEach(() => {
    service = new JWTService();
  });

  it('should generate and verify token', () => {
    const token = service.generateAccessToken({
      email: 'a@a.com',
      nombre: 'John',
      apellido: 'Doe',
      tipoUsuario: 'Socio',
    } as never);

    expect(token).toBeTruthy();

    const payload = service.verifyAccessToken(token);
    expect(payload).toEqual(
      expect.objectContaining({
        email: 'a@a.com',
        nombre: 'John',
      }),
    );
  });

  it('should return null for invalid token', () => {
    const payload = service.verifyAccessToken('invalid-token');

    expect(payload).toBeNull();
  });
});
