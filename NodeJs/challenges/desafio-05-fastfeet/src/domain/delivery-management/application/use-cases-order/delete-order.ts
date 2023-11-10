import { Either, left, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

export interface DeleteOrderUseCaseRequest {
  orderId: string
}

export type DeleteOrderUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
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

    return right(null)
  }
}
