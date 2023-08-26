import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterUserInputDto } from './registration.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { REGISTRATION_QUEUE } from './registration.const';

@Injectable()
export class RegistrationProducer {
  constructor(@InjectQueue(REGISTRATION_QUEUE) private registrationQueue: Queue) {}

  async registerUser(payload: RegisterUserInputDto) {
    try {
      await this.registrationQueue.add('registerUser', payload);
    } catch (err) {
      throw new BadRequestException(
        `Unable to add job to registerUserProducer. Err: ${err?.message}`,
      );
    }
  }
}
