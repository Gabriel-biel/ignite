import { Either, left, rigth } from '@/core/either'
import { OrderAlreadyExists } from '../errors/order-already-exists'
import { OrderRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface DeleteOrderUseCaseRequest {
  orderId: string
}

export type DeleteOrderUseCaseResponse = Either<OrderAlreadyExists, null>

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    await this.orderRepository.delete(order)

    return rigth(null)
  }
}
