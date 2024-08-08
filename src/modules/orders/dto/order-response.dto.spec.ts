import 'reflect-metadata';
import { validate } from 'class-validator';
import { OrderResponseDto } from './order-response.dto';

describe('OrderResponseDto', () => {
  it('should be valid with correct values', async () => {
    const dto = new OrderResponseDto();
    dto.user_id = 1;
    dto.name = 'John Doe';
    dto.orders = [
      {
        order_id: 123,
        total: '100.00',
        date: '2023-08-05',
        products: [
          { product_id: 1, value: '50.00' },
          { product_id: 2, value: '50.00' },
        ],
      },
    ];

    const errors = await validate(dto);
    console.log('Validation Errors for valid DTO:', errors);
    expect(errors.length).toBe(0);
  });

  it('should handle empty orders array', async () => {
    const dto = new OrderResponseDto();
    dto.user_id = 1;
    dto.name = 'John Doe';
    dto.orders = [];

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
