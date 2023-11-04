import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PickedUpOrderUseCaseRequest {
  orderId: string
  deliverymanId: string
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
    deliverymanId,
    pickupAt,
  }: PickedUpOrderUseCaseRequest): Promise<PickedUpOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (order.pickup_at) {
      return left(new NotAllowedError())
    }

    order.pickup_at = pickupAt
    order.deliverymanId = new UniqueEntityID(deliverymanId)

    await this.orderRepository.save(order)

    return right({ order })
  }
}
