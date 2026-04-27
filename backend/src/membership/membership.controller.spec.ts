import { MembershipController } from './membership.controller';

describe('MembershipController', () => {
  const asignMembershipService = { execute: jest.fn() };
  let controller: MembershipController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new MembershipController(asignMembershipService as never);
  });

  it('asignMembership should call service with body values', async () => {
    const body = { idSocio: 'socio-1', idTipoMembresia: 'tm-1' };

    await controller.asignMembership(body);

    expect(asignMembershipService.execute).toHaveBeenCalledWith('socio-1', 'tm-1');
  });
});
