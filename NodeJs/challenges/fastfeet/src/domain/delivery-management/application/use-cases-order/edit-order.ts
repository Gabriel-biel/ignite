import { Either, left, rigth } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { OrderAttachmentsRepository } from '../repositories/order-attachments-repository'
import { OrderAttachmentList } from '../../enterprise/entities/order-attachment-list'
import { OrderAttachment } from '../../enterprise/entities/order-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface EditOrderUseCaseRequest {
  orderId: string
  recipientId: string
  pickupAvailableOrder?: Date
  pickupAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
  attachmentsIds?: string[]
}

export type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

export class EditOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderAttachmentsRepository: OrderAttachmentsRepository,
  ) {}

  async execute({
    orderId,
    recipientId,
    deliveredAt,
    pickupAvailableOrder,
    pickupAt,
    returnedAt,
    attachmentsIds,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    if (!attachmentsIds) {
      order.pickup_available_order = pickupAvailableOrder
      order.pickup_at = pickupAt
      order.returned_at = returnedAt

      await this.orderRepository.save(order)

      return rigth({ order })
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
    order.pickup_available_order = pickupAvailableOrder
    order.returned_at = returnedAt
    order.attachments = orderAttachmentList

    await this.orderRepository.save(order)

    return rigth({ order })
  }
}
