import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'

export interface FetchOrdersNearbyRequest {
  deliverymanId: string
  accountLatitude: number
  accountLongitude: number
}

export type FetchOrdersNearbyResponse = Either<
  null,
  {
    orders: Order[]
  }
>

@Injectable()
export class FetchOrdersNearbyUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    deliverymanId,
    accountLatitude,
    accountLongitude,
  }: FetchOrdersNearbyRequest): Promise<FetchOrdersNearbyResponse> {
    const allOrders = await this.orderRepository.findManyNearby({
      deliverymanId,
      latitude: accountLatitude,
      longitude: accountLongitude,
    })

    const orders = allOrders.filter((order) => !order.delivered_at)

    return right({ orders })
  }
}
