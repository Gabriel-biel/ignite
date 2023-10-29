import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaNotiicationsRepository implements NotificationsRepository {
  create(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }

  save(notifacation: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
