import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { BullConfigService } from '../../src/shared/bull.helper';
import { BullUsingInMemoryRedisService } from '../common/bull-using-in-memory-redis.service';

describe('AppController (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BullConfigService)
      .useClass(BullUsingInMemoryRedisService)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', async () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect('Hello World!');
  });
});
