import { NotFoundException } from '@nestjs/common';
import { DeleteClaseService } from './DeleteClase.service';

describe('DeleteClaseService', () => {
  const claseRepository = {
    getById: jest.fn(),
    delete: jest.fn(),
  };
  let service: DeleteClaseService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new DeleteClaseService(claseRepository as never);
  });

  it('should throw when clase does not exist', async () => {
    claseRepository.getById.mockResolvedValue(null);

    await expect(service.execute('1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should delete clase', async () => {
    claseRepository.getById.mockResolvedValue({ idClase: '1' });
    claseRepository.delete.mockResolvedValue(undefined);

    await service.execute('1');

    expect(claseRepository.delete).toHaveBeenCalledWith('1');
  });
});
