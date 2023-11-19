import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import { OrderAttachment } from '@/domain/delivery-management/enterprise/entities/order-attachment'

export class InMemoryOrderAttachmentsRepository
  implements OrderAttachmentsRepository
{
  public items: OrderAttachment[] = []

  async createMany(attachments: OrderAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: OrderAttachment[]): Promise<void> {
    const orderAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = orderAttachments
  }

  async findManyByOrderId(orderId: string) {
    const attachments = this.items.filter(
      (item) => item.orderId.toString() === orderId,
    )

    return attachments
  }

  async deleteByManyOrderId(orderId: string) {
    const orderAttachments = this.items.filter(
      (item) => item.orderId.toString() !== orderId,
    )

    this.items = orderAttachments
  }
}
