import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'

export interface OrderRepository {
  create(order: Order): Promise<void>
  findById(orderId: string): Promise<Order | null>
  findManyByOrdersRecipient(
    page: PaginationParams,
    recipientId: string,
  ): Promise<Order[]>
  findManyByOrdersDeliveryman(
    page: PaginationParams,
    deliverymanId: string,
  ): Promise<Order[]>
  delete(order: Order): Promise<void>
  save(order: Order): Promise<void>
}
