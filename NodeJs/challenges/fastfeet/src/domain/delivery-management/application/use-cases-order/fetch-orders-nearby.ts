import { Either, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export interface FetchOrdersNearbyRequest {
  deliverymanId: string
  deliverymanLatitude: number
  deliverymanLongitude: number
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
    deliverymanId,
    deliverymanLatitude,
    deliverymanLongitude,
  }: FetchOrdersNearbyRequest): Promise<FetchOrdersNearbyResponse> {
    const orders = await this.orderRepository.findManyNearby({
      deliverymanId,
      latitude: deliverymanLatitude,
      longitude: deliverymanLongitude,
    })

    return right({ orders })
  }
}
