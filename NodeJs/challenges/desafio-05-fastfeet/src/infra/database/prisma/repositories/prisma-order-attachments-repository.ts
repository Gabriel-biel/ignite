import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaOrderAttachmentsMapper } from '../mappers/prisma-order-attachments-mapper'

@Injectable()
export class PrismaOrderAttachmentsRepository
  implements OrderAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

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
