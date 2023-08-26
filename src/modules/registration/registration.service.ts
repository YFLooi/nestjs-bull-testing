import { Injectable, BadRequestException } from '@nestjs/common';
import {
  RegisterUserInputDto,
  RegisterUserResponseDto,
} from './registration.dto';
import { HttpService } from '@nestjs/axios';
import * as https from 'https';
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
    console.error(
      `registration queue: Failed job in queue '${REGISTRATION_QUEUE}'`,       {
        job,
        error,
      },
    );
  }

  @Process('registerUser')
  registerUser(payload: RegisterUserInputDto):RegisterUserResponseDto {
    console.log(`========> Received payload to register user`, payload)

    return {
      RespData: payload
    };
  }
}