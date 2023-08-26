import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { RegistrationProducer } from './registration.producer';
import { REGISTRATION_QUEUE } from './registration.const';
import { mockBullQueue } from '../../shared/jest-mocks';
import { getQueueToken } from '@nestjs/bull';
import { RegisterUserInputDto } from './registration.dto';

describe('RegistrationProducer', () => {
  let registrationProducer: RegistrationProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationProducer,
        {
          provide: getQueueToken(REGISTRATION_QUEUE),
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    registrationProducer = module.get<RegistrationProducer>(RegistrationProducer);
  });

  it('should be defined', () => {
    expect(registrationProducer).toBeDefined();
  });

  describe('registerUser', () => {
    const mockRegistrationPayload:RegisterUserInputDto = {
      name: 'My Test User',
      ICNumber: '921221105874',
    };

    it('should add registration attempt to Bull queue', async () => {
      // Action
      const res = await registrationProducer.registerUser(mockRegistrationPayload);

      // Assert
      expect(res).toBeUndefined();
    });
    it('should throw error if fail to add to Bull queue', async () => {
      // Prepare
      const errorMsg = 'Failed to add to queue';
      mockBullQueue.add.mockRejectedValueOnce(new Error(errorMsg));

      // Action
      try {
        await registrationProducer.registerUser(mockRegistrationPayload);
      } catch (err) {
        // Assert
        expect(err?.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(err?.message).toEqual(`Unable to add job to registerUserProducer. Err: ${errorMsg}`);
      }
    });
  });
});
