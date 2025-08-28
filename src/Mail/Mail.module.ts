import { Module } from '@nestjs/common';
import { SERVICE_TOKENS } from 'shared/constants';
import { mailService } from './Mail.service';
import { EmailProcessor } from './Mail.processor';
import { EmailListener } from './Mail.Listner';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue', // This creates the BullQueue_email-queue provider
    }),
  ],

  providers: [
    EmailListener,
    EmailProcessor,
    {
      provide: SERVICE_TOKENS.INotificationService,
      useClass: mailService,
    },
  ],
  exports: [
    { provide: SERVICE_TOKENS.INotificationService, useClass: mailService },
  ],
})
export class MailModule {}
