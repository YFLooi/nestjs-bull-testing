import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationModule } from '../../src/modules/registration/registration.module';
import { RegistrationService } from '../../src/modules/registration/registration.service';
import { mockBullQueue } from '../../src/shared/jest-mocks';
import { BullConfigService } from '../../src/shared/bull.helper';
import { BullUsingInMemoryRedisService } from '../common/bull-using-in-memory-redis.service';
import { AppModule } from '../../src/app.module';
import { RegisterUserInputDto } from '../../src/modules/registration/registration.dto';

describe('RegistrationController (integration)', () => {
  let registrationController: INestApplication;
  let registrationService: RegistrationService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RegistrationModule, AppModule],
      providers: [],
    })
      // Importing AppModule requires implementing override
      .overrideProvider(BullConfigService)
      .useClass(BullUsingInMemoryRedisService)
      .compile();

    registrationController = moduleFixture.createNestApplication();
    // registrationService = moduleFixture.get<RegistrationService>(RegistrationService);

    await registrationController.init();
  });
  afterAll(async () => {
    await registrationController.close();
  });

  describe('POST / registerUser', () => {
    const mockRegistrationPayload: RegisterUserInputDto = {
      name: 'My Test User',
      ICNumber: '921101051498',
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return ok status and add job to queue by default', async () => {
      // Action and assert
      const response = await request(registrationController.getHttpServer())
        .post('/registration')
        .send(mockRegistrationPayload)
        .set('Content-Type', 'application/json');

      expect(response.status).toEqual(201);
      expect(response.body).toEqual({});
    });
  });
});
