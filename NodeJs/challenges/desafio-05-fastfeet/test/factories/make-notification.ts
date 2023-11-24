import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper'

export function MakeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const NewNotification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return NewNotification
}

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(data: Partial<NotificationProps> = {}) {
    const notification = MakeNotification(data)

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    })

    return notification
  }
}
