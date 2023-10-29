import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import { OrderAttachment } from '@/domain/delivery-management/enterprise/entities/order-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaOrderAttachmentsRepository
  implements OrderAttachmentsRepository
{
  findManyByOrderId(orderId: string): Promise<OrderAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteByManyOrderId(orderId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
