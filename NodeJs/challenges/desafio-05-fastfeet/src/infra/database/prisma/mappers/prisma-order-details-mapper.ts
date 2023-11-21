import {
  Order as PrismaOrder,
  User as PrismaRecipient,
  Address as PrismaAddress,
  Attachments as PrismaAttachments,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderDetails } from '@/domain/delivery-management/enterprise/entities/value-objects/order-details'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper'

type PrismaOrderDetails = PrismaOrder & {
  recipient: PrismaRecipient
  address: PrismaAddress
  attachments: PrismaAttachments[]
}

export class PrismaOrderDetailsMapper {
  static toDomain(raw: PrismaOrderDetails): OrderDetails {
    return OrderDetails.create({
      orderId: new UniqueEntityID(raw.id),
      recipientId: new UniqueEntityID(raw.recipientId),
      bestAddressId: raw.recipient.bestAddressId
        ? new UniqueEntityID(raw.recipient.bestAddressId)
        : null,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      cpfRecipient: raw.recipient.cpf,
      recipientName: raw.recipient.name,
      recipientStreet: raw.address.street,
      recipientHouseNumber: raw.address.houseNumber,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
