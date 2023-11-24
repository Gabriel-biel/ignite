import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaOrderAttachmentsMapper } from '../mappers/prisma-order-attachments-mapper'
import { OrderAttachment } from '@/domain/delivery-management/enterprise/entities/order-attachment'

@Injectable()
export class PrismaOrderAttachmentsRepository
  implements OrderAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachments: OrderAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaOrderAttachmentsMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachments.updateMany(data)
  }

  async deleteMany(attachments: OrderAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }

    const attachmentsIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    await this.prisma.attachments.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    })
  }

  async findManyByOrderId(orderId: string) {
    const items = await this.prisma.attachments.findMany({
      where: {
        orderId,
      },
    })

    const attachments = items.map((item) =>
      PrismaOrderAttachmentsMapper.toDomain(item),
    )

    return attachments
  }

  async deleteByManyOrderId(orderId: string) {
    await this.prisma.attachments.deleteMany({
      where: {
        orderId,
      },
    })
  }
}
