import { NotFoundException } from '@nestjs/common';
import { UpdateClaseService } from './UpdateClase.service';

describe('UpdateClaseService', () => {
  const claseRepository = {
    getById: jest.fn(),
    update: jest.fn(),
  };
  let service: UpdateClaseService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UpdateClaseService(claseRepository as never);
  });

  it('should throw when clase does not exist', async () => {
    claseRepository.getById.mockResolvedValue(null);

    await expect(service.execute('1', { nombre: 'A' } as never)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should update clase', async () => {
    claseRepository.getById.mockResolvedValue({ idClase: '1' });
    claseRepository.update.mockResolvedValue({ idClase: '1', nombre: 'A' });

    const result = await service.execute('1', { nombre: 'A' } as never);

    expect(claseRepository.update).toHaveBeenCalledWith('1', { nombre: 'A' });
    expect(result).toEqual({ idClase: '1', nombre: 'A' });
  });
});
