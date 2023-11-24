import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/delivery-management/enterprise/entities/recipient'
import { User as PrismaRecipient, Prisma } from '@prisma/client'

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        bestAddressId: raw.bestAddressId
          ? new UniqueEntityID(raw.bestAddressId)
          : null,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(recipient: Recipient): Prisma.UserUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      bestAddressId: recipient.bestAddressId?.toString(),
      name: recipient.name,
      email: recipient.email,
      cpf: recipient.cpf,
      role: recipient.role ?? 'RECIPIENT',
    }
  }
}
