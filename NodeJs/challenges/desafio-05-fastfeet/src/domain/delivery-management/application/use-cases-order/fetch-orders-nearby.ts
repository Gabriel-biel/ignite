import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export interface FetchOrdersNearbyRequest {
  accountId: string
  accountLatitude: number
  accountLongitude: number
}

export type FetchOrdersNearbyResponse = Either<
  null,
  {
    orders: Order[]
  }
>

export class FetchOrdersNearbyUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    accountId,
    accountLatitude,
    accountLongitude,
  }: FetchOrdersNearbyRequest): Promise<FetchOrdersNearbyResponse> {
    const orders = await this.orderRepository.findManyNearby({
      accountId,
      latitude: accountLatitude,
      longitude: accountLongitude,
    })

    return right({ orders })
  }
}
