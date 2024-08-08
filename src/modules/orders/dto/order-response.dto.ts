import { Order } from '../entities/order.entity';

export class OrderResponseDto {
  user_id: number;
  name: string;
  orders: Order[];
}
