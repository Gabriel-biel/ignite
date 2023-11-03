import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'

export interface FindManyNearbyParams {
  accountId: string
  latitude: number
  longitude: number
}

export interface OrderRepository {
  create(order: Order): Promise<void>
  findById(orderId: string): Promise<Order | null>
  findManyByOrdersRecipient(
    page: PaginationParams,
    recipientId: string,
  ): Promise<Order[]>
  findManyByOrdersAccount(
    page: PaginationParams,
    accountId: string,
  ): Promise<Order[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Order[]>
  delete(order: Order): Promise<void>
  save(order: Order): Promise<void>
}
