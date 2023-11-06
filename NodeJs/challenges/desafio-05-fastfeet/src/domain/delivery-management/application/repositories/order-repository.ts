import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'

export interface FindManyNearbyParams {
  deliverymanId: string
  latitude: number
  longitude: number
}

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract findById(orderId: string): Promise<Order | null>
  abstract findManyByOrdersRecipient(
    { page }: PaginationParams,
    recipientId: string,
  ): Promise<Order[]>

  abstract findManyByOrdersDeliveryman(
    { page }: PaginationParams,
    delvierymanId: string,
  ): Promise<Order[]>

  abstract findManyNearby({
    deliverymanId,
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Order[]>

  abstract delete(order: Order): Promise<void>
  abstract save(order: Order): Promise<void>
}
