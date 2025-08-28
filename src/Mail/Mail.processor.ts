// email/email.processor.ts
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { Job } from 'bull';
import { INotificationService } from 'Interfaces/IServices/INotificationService';
import * as nodemailer from 'nodemailer';
import { SERVICE_TOKENS } from 'shared/constants';
import { Notification } from 'src/Notification/models/notification.model';
import { NotificationJobOption } from 'src/Notification/models/NotificationJobOptions.model';

@Processor('email-queue')
export class EmailProcessor {
  constructor(
    @Inject(SERVICE_TOKENS.INotificationService)
    private readonly mailService: INotificationService,
  ) {}

  @Process('send-email')
  async handleSendEmail(job: Job<Notification>) {
    const mailDetails = job.data;
    try {
      this.mailService.send(mailDetails);
    } catch (error) {
      console.log(error);
    }
  }
}
