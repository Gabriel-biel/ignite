import { Either, left, rigth } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Order } from '../../enterprise/entity/order'
import { OrderRepository } from '../repositories/order-repository'

export interface GetOrderUseCaseRequest {
  orderId: string
}

export type GetOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    return rigth({ order })
  }
}
