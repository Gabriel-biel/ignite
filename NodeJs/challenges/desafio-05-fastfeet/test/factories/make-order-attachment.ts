import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  OrderAttachment,
  OrderAttachmentProps,
} from '@/domain/delivery-management/enterprise/entities/order-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function MakeOrderAttachment(
  props: Partial<OrderAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const orderattachment = OrderAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      orderId: new UniqueEntityID(),
      ...props,
    },
    id,
  )

  return orderattachment
}

@Injectable()
export class OrderAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrderAttachment(
    data: Partial<OrderAttachmentProps> = {},
  ): Promise<OrderAttachment> {
    const orderAttachment = MakeOrderAttachment(data)

    await this.prisma.attachments.update({
      where: {
        id: orderAttachment.attachmentId.toString(),
      },
      data: {
        orderId: orderAttachment.orderId.toString(),
      },
    })

    return orderAttachment
  }
}
