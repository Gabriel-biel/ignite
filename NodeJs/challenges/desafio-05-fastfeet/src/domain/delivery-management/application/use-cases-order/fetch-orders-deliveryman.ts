import { Either, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { OrderWithRecipient } from '../../enterprise/entities/value-objects/order-with-recipient'

export interface FetchOrdersDeliverymanUseCaseRequest {
  page: number
  deliverymanId: string
}

export type FetchOrdersDeliverymanUseCaseResponse = Either<
  null,
  {
    orders: OrderWithRecipient[]
  }
>

@Injectable()
export class FetchOrdersDeliverymanUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
    deliverymanId,
  }: FetchOrdersDeliverymanUseCaseRequest): Promise<FetchOrdersDeliverymanUseCaseResponse> {
    const orders =
      await this.orderRepository.findManyOrdersWithRecipientByDeliverymanId(
        { page },
        deliverymanId,
      )

    return right({ orders })
  }
}
