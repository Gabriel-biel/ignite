import {
  Order as PrismaOrder,
  User as PrismaRecipient,
  Address as PrismaAddress,
} from '@prisma/client'

import { OrderWithRecipient } from '@/domain/delivery-management/enterprise/entities/value-objects/order-with-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type PrismaOrderWithRecipient = PrismaOrder & {
  recipient: PrismaRecipient
  address: PrismaAddress
}

export class PrismaOrderWithRecipientMapper {
  static toDomain(raw: PrismaOrderWithRecipient): OrderWithRecipient {
    return OrderWithRecipient.create({
      orderId: new UniqueEntityID(raw.id),
      recipientId: new UniqueEntityID(raw.recipientId),
      cpfRecipient: raw.recipient.cpf,
      recipientName: raw.recipient.name,
      recipientStreet: raw.address.street,
      recipientHouseNumber: raw.address.houseNumber,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
