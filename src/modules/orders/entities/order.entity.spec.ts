import 'reflect-metadata';
import { validate } from 'class-validator';
import { Order, Product, OrderResponseDto } from './order.entity';

describe('Order Entities', () => {
  describe('Product', () => {
    it('should be valid with correct values', async () => {
      const product = new Product();
      product.product_id = 1;
      product.value = '50.00';

      const errors = await validate(product);
      expect(errors.length).toBe(0);
    });

    it('should be invalid with incorrect values', async () => {
      const product = new Product();
      product.product_id = null;
      product.value = 'NaN';

      const errors = await validate(product);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('Order', () => {
    it('should be valid with correct values', async () => {
      const order = new Order();
      order.order_id = 123;
      order.total = '100.00';
      order.date = '2023-08-05';
      order.products = [
        { product_id: 1, value: '50.00' },
        { product_id: 2, value: '50.00' },
      ];

      const errors = await validate(order);
      expect(errors.length).toBe(0);
    });

    it('should be invalid with incorrect values', async () => {
      const order = new Order();
      order.order_id = null;
      order.total = 'NaN';
      order.date = 'invalid-date';
      order.products = [{ product_id: null, value: 'NaN' }];

      const errors = await validate(order);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

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
      expect(errors.length).toBe(0);
    });

    it('should be invalid with incorrect values', async () => {
      const dto = new OrderResponseDto();
      dto.user_id = null;
      dto.name = '';
      dto.orders = [
        {
          order_id: null,
          total: 'NaN',
          date: 'invalid-date',
          products: [{ product_id: null, value: 'NaN' }],
        },
      ];

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
