import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper'
import { Recipient } from '@/domain/delivery-management/enterprise/entities/recipient'

@Injectable()
export class PrismaRecipientsRepository implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipient: Recipient) {
    const data = PrismaRecipientMapper.toPrisma(recipient)
    await this.prisma.user.create({
      data,
    })
  }

  async findById(recipientId: string) {
    const recipient = await this.prisma.user.findUnique({
      where: { id: recipientId },
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async findByCpf(cpf: string) {
    const recipient = await this.prisma.user.findFirst({
      where: { cpf },
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async delete(recicipent: Recipient) {
    const data = PrismaRecipientMapper.toPrisma(recicipent)
    await this.prisma.user.delete({
      where: { id: data.id },
    })
  }

  async save(recipient: Recipient) {
    const data = PrismaRecipientMapper.toPrisma(recipient)
    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
