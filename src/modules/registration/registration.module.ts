import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationProducer } from './registration.producer'
import { RegistrationService } from './registration.service'
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { REGISTRATION_QUEUE } from './registration.const';

@Module({
  imports: [HttpModule,
    BullModule.registerQueue({
      name: REGISTRATION_QUEUE,
    }),
  ],
  providers: [RegistrationProducer, RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
