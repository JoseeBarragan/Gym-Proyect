import { PasswordService } from './Password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    service = new PasswordService();
  });

  it('should hash and compare password correctly', async () => {
    const hash = await service.hash('mypassword');

    expect(hash).toBeTruthy();
    await expect(service.compare('mypassword', hash)).resolves.toBe(true);
    await expect(service.compare('wrong', hash)).resolves.toBe(false);
  });
});
