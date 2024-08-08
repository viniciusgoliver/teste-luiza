import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderResponseDto } from './dto/order-response.dto';
import { validate } from 'class-validator';
import { isValidOrderResponseDto } from './helpers';

jest.mock('class-validator', () => ({
  validate: jest.fn(),
}));

jest.mock('./helpers', () => ({
  isValidOrderResponseDto: jest.fn(),
}));

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process a file and return correct order data', async () => {
    const fileBuffer = Buffer.from(
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308\n',
      'utf-8',
    );

    const expectedResult: OrderResponseDto[] = [
      {
        user_id: 70,
        name: 'Palmer Prosacco',
        orders: [
          {
            order_id: 753,
            total: '1836.74',
            date: '2021-03-08',
            products: [
              {
                product_id: 3,
                value: '1836.74',
              },
            ],
          },
        ],
      },
    ];

    (isValidOrderResponseDto as jest.Mock).mockReturnValue(true);

    (validate as jest.Mock).mockResolvedValue([]);

    const result = await service.processFile(fileBuffer);
    expect(result).toEqual(expectedResult);
  });

  it('should handle invalid data and return empty result', async () => {
    const fileBuffer = Buffer.from(
      '1234567890John Doe    0000000001 0000000001 NaN 2023-08-05\n' +
        '0000000000   \n',
      'utf-8',
    );

    const expectedResult: OrderResponseDto[] = [];

    (isValidOrderResponseDto as jest.Mock).mockReturnValue(false);

    (validate as jest.Mock).mockResolvedValue([]);

    const result = await service.processFile(fileBuffer);
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error for empty file', async () => {
    const fileBuffer = Buffer.from('', 'utf-8');

    await expect(service.processFile(fileBuffer)).rejects.toThrow(
      'Arquivo vazio',
    );
  });

  it('should throw an error for invalid DTO', async () => {
    const fileBuffer = Buffer.from(
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308\n',
      'utf-8',
    );

    (isValidOrderResponseDto as jest.Mock).mockReturnValue(true);

    (validate as jest.Mock).mockResolvedValue([
      {
        property: 'name',
        constraints: { isNotEmpty: 'name should not be empty' },
      },
    ]);

    await expect(service.processFile(fileBuffer)).rejects.toThrow(
      'Dados inválidos',
    );
  });
});
