import { Either, rigth } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'

export interface FetchOrdersNearbyRequest {
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
    deliverymanLatitude,
    deliverymanLongitude,
  }: FetchOrdersNearbyRequest): Promise<FetchOrdersNearbyResponse> {
    const orders = await this.orderRepository.findManyNearby({
      latitude: deliverymanLatitude,
      longitude: deliverymanLongitude,
    })

    return rigth({ orders })
  }
}
