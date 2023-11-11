import { OrderAttachment } from '../../enterprise/entities/order-attachment'

export abstract class OrderAttachmentsRepository {
  abstract findManyByOrderId(orderId: string): Promise<OrderAttachment[]>
  abstract deleteByManyOrderId(orderId: string): Promise<void>
}
