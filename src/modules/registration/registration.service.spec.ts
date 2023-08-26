import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationService } from './registration.service';
import { REGISTRATION_QUEUE } from './registration.const';
import { RegisterUserResponseDto } from './registration.dto';
import { mockBullQueue } from '../../shared/jest-mocks';
import { getQueueToken } from '@nestjs/bull';
import { RegisterUserInputDto } from './registration.dto';

describe('RegistrationService', () => {
  let registrationService: RegistrationService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        {
          provide: getQueueToken(REGISTRATION_QUEUE),
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    registrationService = module.get<RegistrationService>(RegistrationService);
  });

  it('should be defined', () => {
    expect(registrationService).toBeDefined();
  });

  describe('registerUser', () => {
    const mockRegistrationPayload:RegisterUserInputDto = {
      name: 'My Test User',
      ICNumber: '921221105874',
    };

    it('should return registration details on successful request', async () => {
      // Prepare
      const mockRegistrationResponse: RegisterUserResponseDto = {
        RespData: mockRegistrationPayload,
      };

      // Action
      const res = await registrationService.registerUser(mockRegistrationPayload);

      // Assert
      expect(res).toEqual(mockRegistrationResponse);
    });
  });
});
