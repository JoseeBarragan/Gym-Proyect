import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentsService } from './getPayments.service';

describe('GetPaymentsService', () => {
  let service: GetPaymentsService;
  let mockPaymentRepository: {
    getPayments: jest.Mock;
  };

  beforeEach(async () => {
    mockPaymentRepository = {
      getPayments: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPaymentsService,
        {
          provide: 'IPaymentRepository',
          useValue: mockPaymentRepository,
        },
      ],
    }).compile();

    service = module.get<GetPaymentsService>(GetPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return a list of payments', async () => {
      // Arrange
      const mockPayments = [
        {
          idPago: '123e4567-e89b-12d3-a456-426614174000',
          idMembresia: '987fcdeb-51a2-43d7-9012-3214567890ab',
          monto: 1500,
          fechaPago: new Date('2026-05-04T10:30:00.000Z'),
          metodoPago: 'STRIPE',
          estadoPago: 'COMPLETADO',
        },
      ];
      mockPaymentRepository.getPayments.mockResolvedValue(mockPayments);

      // Act
      const result = await service.execute();

      // Assert
      expect(mockPaymentRepository.getPayments).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPayments);
    });

    it('should return an empty array if there are no payments', async () => {
      // Arrange
      mockPaymentRepository.getPayments.mockResolvedValue([]);

      // Act
      const result = await service.execute();

      // Assert
      expect(mockPaymentRepository.getPayments).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should throw an error if repository throws', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockPaymentRepository.getPayments.mockRejectedValue(error);

      // Act & Assert
      await expect(service.execute()).rejects.toThrow('Database connection failed');
      expect(mockPaymentRepository.getPayments).toHaveBeenCalledTimes(1);
    });
  });
});
