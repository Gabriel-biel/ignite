import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderAttachment } from '@/domain/delivery-management/enterprise/entities/order-attachment'
import { Attachments as PrismaAttachment } from '@prisma/client'

export class PrismaOrderAttachmentsMapper {
  static toDomain(raw: PrismaAttachment): OrderAttachment {
    if (!raw.orderId) {
      throw new Error('invalid attachment type')
    }
    return OrderAttachment.create(
      {
        orderId: new UniqueEntityID(raw.orderId),
        attachmentId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
