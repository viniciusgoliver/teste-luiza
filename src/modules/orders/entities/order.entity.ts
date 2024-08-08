import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Product {
  @IsNumber()
  product_id: number;

  @IsString()
  value: string;
}

export class Order {
  @IsNumber()
  order_id: number;

  @IsString()
  total: string;

  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}

export class OrderResponseDto {
  @IsNumber()
  user_id: number;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Order)
  orders: Order[];
}
