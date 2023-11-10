import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'

export interface FetchOrdersRecipientUseCaseRequest {
  page: number
  recipientId: string
}

export type FetchOrdersRecipientUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

@Injectable()
export class FetchOrdersRecipientUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
    recipientId,
  }: FetchOrdersRecipientUseCaseRequest): Promise<FetchOrdersRecipientUseCaseResponse> {
    const order = await this.orderRepository.findManyByOrdersRecipient(
      { page },
      recipientId,
    )

    return right({ order })
  }
}
