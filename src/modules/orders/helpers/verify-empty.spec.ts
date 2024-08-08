import {
  isValidOrderResponseDto,
  isValidOrder,
  isValidProduct,
} from '../helpers/verify-empty';
import { OrderResponseDto } from '../dto/order-response.dto';
import { Order, Product } from '../entities/order.entity';

describe('Helper Functions', () => {
  describe('isValidOrderResponseDto', () => {
    it('should return true for a valid OrderResponseDto', () => {
      const dto: OrderResponseDto = {
        user_id: 1,
        name: 'John Doe',
        orders: [
          {
            order_id: 123,
            total: '100.00',
            date: '2023-08-05',
            products: [
              {
                product_id: 1,
                value: '50.00',
              },
              {
                product_id: 2,
                value: '50.00',
              },
            ],
          },
        ],
      };

      expect(isValidOrderResponseDto(dto)).toBe(true);
    });

    it('should return false for an invalid OrderResponseDto', () => {
      const invalidDto: OrderResponseDto = {
        user_id: null,
        name: '',
        orders: [
          {
            order_id: null,
            total: 'NaN',
            date: '--',
            products: [
              {
                product_id: null,
                value: 'NaN',
              },
            ],
          },
        ],
      };

      expect(isValidOrderResponseDto(invalidDto)).toBe(false);
    });
  });

  describe('isValidOrder', () => {
    it('should return true for a valid Order', () => {
      const order: Order = {
        order_id: 123,
        total: '100.00',
        date: '2023-08-05',
        products: [
          {
            product_id: 1,
            value: '50.00',
          },
        ],
      };

      expect(isValidOrder(order)).toBe(true);
    });

    it('should return false for an invalid Order', () => {
      const invalidOrder: Order = {
        order_id: null,
        total: 'NaN',
        date: '--',
        products: [
          {
            product_id: null,
            value: 'NaN',
          },
        ],
      };

      expect(isValidOrder(invalidOrder)).toBe(false);
    });
  });

  describe('isValidProduct', () => {
    it('should return true for a valid Product', () => {
      const product: Product = {
        product_id: 1,
        value: '50.00',
      };

      expect(isValidProduct(product)).toBe(true);
    });

    it('should return false for an invalid Product', () => {
      const invalidProduct: Product = {
        product_id: null,
        value: 'NaN',
      };

      expect(isValidProduct(invalidProduct)).toBe(false);
    });
  });
});
