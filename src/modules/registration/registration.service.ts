import { Injectable } from '@nestjs/common';
import { RegisterUserResponseDto } from './registration.dto';
import { Job } from 'bull';
import { OnQueueError, OnQueueFailed, OnQueueStalled, Processor, Process } from '@nestjs/bull';
import { REGISTRATION_QUEUE } from './registration.const';

@Injectable()
@Processor(REGISTRATION_QUEUE)
export class RegistrationService {
  @OnQueueError()
  onQueueError(error: Error) {
    console.error(`registration queue: Error in queue '${REGISTRATION_QUEUE}'`, error);
  }
  @OnQueueStalled()
  onQueueStalled(job: Job) {
    console.debug(`registration queue: Job stalled in queue '${REGISTRATION_QUEUE}'`, job);
  }
  @OnQueueFailed()
  onQueueFailed(job: Job, error: Error) {
    console.error(`registration queue: Failed job in queue '${REGISTRATION_QUEUE}'`, {
      job,
      error,
    });
  }

  @Process('registerUser')
  registerUser(job: Job): RegisterUserResponseDto {
    console.log(`========> Received payload to register user: `, JSON.stringify(job.data));

    return {
      RespData: job.data,
    };
  }
}
