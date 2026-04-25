import { UsersController } from './users.controller';
import { TipoUsuario } from './dto/user.dto';

describe('UsersController', () => {
  const getProfileService = { execute: jest.fn() };
  const getAllUsersService = { execute: jest.fn() };
  const updateUserService = { execute: jest.fn() };
  const deleteUserService = { execute: jest.fn() };
  const createInstructorService = { execute: jest.fn() };
  let controller: UsersController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new UsersController(
      getProfileService as never,
      getAllUsersService as never,
      updateUserService as never,
      deleteUserService as never,
      createInstructorService as never,
    );
  });

  it('getProfile should delegate to service', async () => {
    getProfileService.execute.mockResolvedValue({ idUsuario: '1' });

    const result = await controller.getProfile('1');

    expect(getProfileService.execute).toHaveBeenCalledWith('1');
    expect(result).toEqual({ idUsuario: '1' });
  });

  it('getAllUsers should filter by tipoUsuario', async () => {
    getAllUsersService.execute.mockResolvedValue([{ idUsuario: '1' }]);

    const result = await controller.getAllUsers(TipoUsuario.SOCIO);

    expect(getAllUsersService.execute).toHaveBeenCalledWith(TipoUsuario.SOCIO);
    expect(result).toEqual([{ idUsuario: '1' }]);
  });

  it('updateProfile should delegate to service', async () => {
    const dto = { nombre: 'Nuevo' };
    updateUserService.execute.mockResolvedValue({ idUsuario: '1' });

    const result = await controller.updateProfile('1', dto as never);

    expect(updateUserService.execute).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual({ idUsuario: '1' });
  });

  it('deleteUser should delegate to service', async () => {
    deleteUserService.execute.mockResolvedValue(undefined);

    await controller.deleteUser('1');

    expect(deleteUserService.execute).toHaveBeenCalledWith('1');
  });

  it('createInstructor should call service', async () => {
    createInstructorService.execute.mockResolvedValue(undefined);

    const result = await controller.createInstructor({ email: 'i@test.com' } as never);

    expect(createInstructorService.execute).toHaveBeenCalledWith({ email: 'i@test.com' });
    expect(result).toBeUndefined();
  });
});
