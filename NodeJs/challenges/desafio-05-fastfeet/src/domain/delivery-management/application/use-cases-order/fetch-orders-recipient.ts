import { Either, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { OrderWithRecipient } from '../../enterprise/entities/value-objects/order-with-recipient'

export interface FetchOrdersRecipientUseCaseRequest {
  page: number
  recipientId: string
}

export type FetchOrdersRecipientUseCaseResponse = Either<
  null,
  {
    orders: OrderWithRecipient[]
  }
>

@Injectable()
export class FetchOrdersRecipientUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
    recipientId,
  }: FetchOrdersRecipientUseCaseRequest): Promise<FetchOrdersRecipientUseCaseResponse> {
    const orders =
      await this.orderRepository.findManyOrdesWithRecipientByRecipientId(
        { page },
        recipientId,
      )

    return right({ orders })
  }
}
