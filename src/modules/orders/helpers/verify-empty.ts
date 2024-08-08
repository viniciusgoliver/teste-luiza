import { OrderResponseDto } from '../dto/order-response.dto';
import { Order, Product } from '../entities/order.entity';

export const isValidOrderResponseDto = (dto: OrderResponseDto): boolean => {
  return (
    dto.user_id != null &&
    dto.name.trim() !== '' &&
    dto.orders.every((order) => isValidOrder(order))
  );
};

export const isValidOrder = (order: Order): boolean => {
  return (
    order.order_id != null &&
    order.total !== 'NaN' &&
    order.date !== '--' &&
    order.products.every((product) => isValidProduct(product))
  );
};

export const isValidProduct = (product: Product): boolean => {
  return product.product_id != null && product.value !== 'NaN';
};
