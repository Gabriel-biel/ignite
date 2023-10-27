import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { OrderAttachmentsRepository } from '../repositories/order-attachments-repository'
import { OrderAttachmentList } from '../../enterprise/entities/order-attachment-list'
import { OrderAttachment } from '../../enterprise/entities/order-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DeliverOrderUseCaseRequest {
  orderId: string
  recipientId: string
  deliveredAt: Date
  attachmentsIds: string[]
}

export type DeliverOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

export class DeliverOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderAttachmentsRepository: OrderAttachmentsRepository,
  ) {}

  async execute({
    orderId,
    recipientId,
    deliveredAt,
    attachmentsIds,
  }: DeliverOrderUseCaseRequest): Promise<DeliverOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    const currentOrderAttachments =
      await this.orderAttachmentsRepository.findManyByOrderId(orderId)

    const orderAttachmentList = new OrderAttachmentList(currentOrderAttachments)

    const orderAttachments = attachmentsIds.map((attachmentId) => {
      return OrderAttachment.create({
        orderId: order.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    orderAttachmentList.update(orderAttachments)

    order.delivered_at = deliveredAt
    order.attachments = orderAttachmentList

    await this.orderRepository.save(order)

    return right({ order })
  }
}
