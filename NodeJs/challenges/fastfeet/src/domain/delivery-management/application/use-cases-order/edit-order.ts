import { Either, left, rigth } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entity/order'
import { OrderRepository } from '../repositories/order-repository'

export interface EditOrderUseCaseRequest {
  orderId: string
  orderAvailable?: Date
  pickupAvailableOrder?: Date
  deliveredAt?: Date
  returnedAt?: Date
}

export type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

export class EditOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    orderAvailable,
    deliveredAt,
    pickupAvailableOrder,
    returnedAt,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (orderId !== order.id.toString()) {
      return left(new NotAllowedError())
    }

    if (orderAvailable) {
      order.order_available = orderAvailable
    }

    if (deliveredAt) {
      order.delivered_at = deliveredAt
    }

    if (pickupAvailableOrder) {
      order.pickup_available_order = pickupAvailableOrder
    }

    if (returnedAt) {
      order.returned_at = returnedAt
    }

    await this.orderRepository.save(order)

    return rigth({ order })
  }
}
