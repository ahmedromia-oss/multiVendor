import { JobOptions } from "bull";
import { Notification } from "src/Notification/models/notification.model";
import { NotificationJobOption } from "src/Notification/models/NotificationJobOptions.model";

export interface INotificationService {
  send(notificationModel:Notification): boolean;
  addJob(notificationModel:Notification , options?:JobOptions):Promise<NotificationJobOption | null>
}
