import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderResponseDto } from './dto/order-response.dto';
import { validate } from 'class-validator';
import { isValidOrderResponseDto } from './helpers';

@Injectable()
export class OrdersService {
  async processFile(file: Buffer): Promise<OrderResponseDto[]> {
    const lines = file
      .toString('utf-8')
      .split('\n')
      .filter((line) => line.trim() !== '');

    const ordersMap = new Map<number, OrderResponseDto>();

    for (const line of lines) {
      const userId = parseInt(line.slice(0, 10).trim(), 10);
      const userName = line.slice(10, 55).trim();
      const orderId = parseInt(line.slice(55, 65).trim(), 10);
      const productId = parseInt(line.slice(65, 75).trim(), 10);
      const value = parseFloat(line.slice(75, 87).trim()).toFixed(2);
      const date = `${line.slice(87, 91)}-${line.slice(91, 93)}-${line.slice(93, 95)}`;

      if (!ordersMap.has(userId)) {
        ordersMap.set(userId, {
          user_id: userId,
          name: userName,
          orders: [],
        });
      }

      const userOrders = ordersMap.get(userId).orders;
      let order = userOrders.find((o) => o.order_id === orderId);

      if (!order) {
        order = { order_id: orderId, total: '0.00', date, products: [] };
        userOrders.push(order);
      }

      order.products.push({ product_id: productId, value });
      order.total = (parseFloat(order.total) + parseFloat(value)).toFixed(2);
    }

    if (ordersMap.size === 0) {
      throw new BadRequestException('Arquivo vazio');
    }

    const result = Array.from(ordersMap.values());

    const filteredResult = result
      .filter((dto) => isValidOrderResponseDto(dto))
      .map(async (dto) => {
        const errors = await validate(dto);
        if (errors.length > 0) {
          throw new BadRequestException('Dados inválidos');
        }
        return dto;
      });

    const finalResult = await Promise.all(filteredResult);

    return finalResult;
  }

  async findByOrderId(
    file: Buffer,
    params: { order_id?: number; date?: string },
  ): Promise<OrderResponseDto> {
    const order_id = Number(params.order_id);
    const date = params.date;

    const result = await this.processFile(file);

    if (!order_id && !date) {
      const order = result.find((o) => o.orders.length > 0);

      if (!order) {
        throw new BadRequestException('Pedido não encontrado');
      }

      return order;
    }

    const order = result.find((o) =>
      o.orders.some(
        (order) => order.order_id === order_id || order.date === date,
      ),
    );

    if (!order) {
      throw new BadRequestException('Pedido não encontrado');
    }

    order.orders = order.orders.filter(
      (o) => o.order_id === order_id || o.date === date,
    );

    return order;
  }
}
