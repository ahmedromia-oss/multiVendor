import { InjectQueue } from '@nestjs/bull';
import { Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobOptions, Queue } from 'bull';
import { createTransport } from 'nodemailer';
import { INotificationService } from 'Interfaces/IServices/INotificationService';
import { Notification } from 'src/Notification/models/notification.model';
import { NotificationJobOption } from 'src/Notification/models/NotificationJobOptions.model';

export class mailService implements INotificationService {
  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('email-queue')
    private emailQueue: Queue<Notification>,
  ) {}
  send(notificationModel: Notification): boolean {
    try {
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get<string>('EmailUser'),
          pass: this.configService.get<string>('passwordEmail'),
        },
      });

      const mailOptions = {
        from: this.configService.get<string>('EmailUser'),
        to: notificationModel.recipient,
        subject: notificationModel.title,
        text: notificationModel.message,
      };

      transporter.sendMail(mailOptions);
      return true;
    } catch (e) {
      return false;
    }
  }

  async addJob(
    notificationModel: Notification,
    options?: JobOptions,
  ): Promise<NotificationJobOption | null> {
    try {
      const job = await this.emailQueue.add('send-email', notificationModel, {
        // Default options
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: 10,
        removeOnFail: 5,
        ...options,
      });
      return {
        jobId: job.id,
        message: 'Email job added to queue successfully',
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
