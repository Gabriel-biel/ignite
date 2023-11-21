import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { OrderDetails } from '../../enterprise/entities/value-objects/order-details'

export interface GetOrderUseCaseRequest {
  orderId: string
  recipientId: string
}

export type GetOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: OrderDetails
  }
>

@Injectable()
export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    recipientId,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.orderRepository.findByDetailsByOrderId(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== order.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    return right({ order })
  }
}
