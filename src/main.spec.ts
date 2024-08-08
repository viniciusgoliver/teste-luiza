import { Test, TestingModule } from '@nestjs/testing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

describe('Bootstrap', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await NestFactory.create(AppModule);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
