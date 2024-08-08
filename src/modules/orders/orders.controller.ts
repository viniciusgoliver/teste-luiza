import {
  Controller,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = this.ordersService.processFile(file.buffer);
    return result;
  }

  @Post('list-orders')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findByOrderId(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: { order_id?: number; date?: string },
  ) {
    const result = this.ordersService.findByOrderId(file.buffer, params);
    return result;
  }
}
