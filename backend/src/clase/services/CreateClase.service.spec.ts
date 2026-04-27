import { CreateClaseService } from './CreateClase.service';

describe('CreateClaseService', () => {
  const claseRepository = { create: jest.fn() };
  const userRepository = { getById: jest.fn() };
  let service: CreateClaseService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreateClaseService(claseRepository as never, userRepository as never);
  });

  it('should throw when instructor is missing', async () => {
    userRepository.getById.mockResolvedValue(null);

    await expect(
      service.execute({ idInstructor: 'i1' } as never),
    ).rejects.toThrow('Instructor no encontrado');
  });

  it('should throw when user is not instructor', async () => {
    userRepository.getById.mockResolvedValue({ tipoUsuario: 'Socio' });

    await expect(
      service.execute({ idInstructor: 'i1' } as never),
    ).rejects.toThrow('Instructor no encontrado');
  });

  it('should create clase for valid instructor', async () => {
    const dto = { idInstructor: 'i1', nombre: 'Yoga' };

    userRepository.getById.mockResolvedValue({ tipoUsuario: 'Instructor' });
    claseRepository.create.mockResolvedValue({ idClase: '1' });

    const result = await service.execute(dto as never);

    expect(claseRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ idClase: '1' });
  });
});
