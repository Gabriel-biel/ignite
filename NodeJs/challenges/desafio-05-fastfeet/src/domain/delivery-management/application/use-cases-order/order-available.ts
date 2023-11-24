import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'

export interface OrderAvailableRequest {
  orderId: string
  recipientId: string
  pickupAvailableOrder: Date
}

export type OrderAvailableResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

@Injectable()
export class OrderAvailableUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    recipientId,
    pickupAvailableOrder,
  }: OrderAvailableRequest): Promise<OrderAvailableResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    if (order.pickup_available_order) {
      return left(new NotAllowedError())
    }

    order.pickup_available_order = pickupAvailableOrder

    await this.orderRepository.save(order)

    return right({ order })
  }
}
