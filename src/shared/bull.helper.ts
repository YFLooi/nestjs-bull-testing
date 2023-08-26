import * as config from 'config';
import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: config.get('redis.host'),
        port: +config.get('redis.port'),
      },
      prefix: config.get('bull.keyPrefix'),
      limiter: {
        max: +config.get('bull.maxJobs'),
        duration: +config.get('bull.jobInterval'),
      },
      defaultJobOptions: {
        attempts: config.get('bull.numAttempts'),
        backoff: {
          type: config.get('bull.backoffStrategy'),
        },
      },
    };
  }
}
