import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './modules/registration/registration.module';
import { BullModule } from '@nestjs/bull';
import { BullConfigService } from './shared/bull.helper';

@Module({
  imports: [
    RegistrationModule,
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
