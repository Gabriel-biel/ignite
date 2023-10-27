import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export interface PickedUpOrderUseCaseRequest {
  orderId: string
  recipientId: string
  pickupAt: Date
}

export type PickedUpOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

export class PickedUpOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    recipientId,
    pickupAt,
  }: PickedUpOrderUseCaseRequest): Promise<PickedUpOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    order.pickup_at = pickupAt

    await this.orderRepository.save(order)

    return right({ order })
  }
}
