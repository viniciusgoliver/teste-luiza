import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { OrdersModule } from './modules/orders/orders.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import OrdersModule', () => {
    const ordersModule = module.select(OrdersModule);
    expect(ordersModule).toBeDefined();
  });
});
