import { ConflictException } from '@nestjs/common';
import { CreateInstructorService } from './createInstructor.service';
import { TipoUsuario } from '../dto/user.dto';

describe('CreateInstructorService', () => {
  const usersRepository = {
    getByEmail: jest.fn(),
    create: jest.fn(),
  };
  const passwordService = {
    hash: jest.fn(),
  };
  let service: CreateInstructorService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreateInstructorService(usersRepository as never, passwordService as never);
  });

  it('should throw when email already exists', async () => {
    usersRepository.getByEmail.mockResolvedValue({ idUsuario: 'u1' });

    await expect(service.execute({ email: 'a@a.com' } as never)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('should create instructor role', async () => {
    const dto = {
      email: 'new@a.com',
      contrasena: '123',
      nombre: 'A',
      apellido: 'B',
      telefono: '123',
      tipoUsuario: TipoUsuario.SOCIO,
    };

    usersRepository.getByEmail.mockResolvedValue(null);
    usersRepository.create.mockResolvedValue({ idUsuario: 'u2' });
    passwordService.hash.mockResolvedValue('hashed-123');

    await service.execute(dto as never);

    expect(usersRepository.create).toHaveBeenCalledWith({
      ...dto,
      contrasena: 'hashed-123',
      tipoUsuario: TipoUsuario.INSTRUCTOR,
    });
  });
});
