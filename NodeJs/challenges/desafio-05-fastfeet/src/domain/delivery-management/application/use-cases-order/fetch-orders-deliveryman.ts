import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'

export interface FetchOrdersDeliverymanUseCaseRequest {
  page: number
  deliverymanId: string
}

export type FetchOrdersDeliverymanUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

@Injectable()
export class FetchOrdersDeliverymanUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
    deliverymanId,
  }: FetchOrdersDeliverymanUseCaseRequest): Promise<FetchOrdersDeliverymanUseCaseResponse> {
    const order = await this.orderRepository.findManyByOrdersDeliveryman(
      { page },
      deliverymanId,
    )

    return right({ order })
  }
}
