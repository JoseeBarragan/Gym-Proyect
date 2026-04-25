import { AsignMembershipService } from './AsignMembership.service';

describe('AsignMembershipService', () => {
  const membershipRepository = {
    getActiveMembership: jest.fn(),
    asignMembership: jest.fn(),
  };
  const typeMembershipRepository = { getTypeMembershipById: jest.fn() };
  let service: AsignMembershipService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AsignMembershipService(
      membershipRepository as never,
      typeMembershipRepository as never,
    );
  });

  it('should start from now when no active membership exists', async () => {
    membershipRepository.getActiveMembership.mockResolvedValue(null);
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue({ duracionDias: 30 });
    membershipRepository.asignMembership.mockResolvedValue({ idMembresia: 'm1' });

    await service.execute('s1', 't1');

    expect(membershipRepository.asignMembership).toHaveBeenCalledWith(
      's1',
      't1',
      expect.objectContaining({
        fechaInicio: expect.any(Date),
        fechaVencimiento: expect.any(Date),
      }),
    );
  });

  it('should extend from active membership expiration date', async () => {
    const baseDate = new Date('2026-01-01T00:00:00.000Z');
    membershipRepository.getActiveMembership.mockResolvedValue({ fechaVencimiento: baseDate });
    typeMembershipRepository.getTypeMembershipById.mockResolvedValue({ duracionDias: 10 });
    membershipRepository.asignMembership.mockResolvedValue({ idMembresia: 'm2' });

    await service.execute('s1', 't1');

    const payload = membershipRepository.asignMembership.mock.calls[0][2];
    expect(payload.fechaInicio).toEqual(baseDate);
    expect(payload.fechaVencimiento).toEqual(new Date('2026-01-11T00:00:00.000Z'));
  });
});
