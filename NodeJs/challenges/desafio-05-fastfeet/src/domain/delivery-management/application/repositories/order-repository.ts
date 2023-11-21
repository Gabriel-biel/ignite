import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'
import { OrderWithRecipient } from '../../enterprise/entities/value-objects/order-with-recipient'
import { OrderDetails } from '../../enterprise/entities/value-objects/order-details'

export interface FindManyNearbyParams {
  deliverymanId: string
  latitude: number
  longitude: number
}

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract findById(orderId: string): Promise<Order | null>
  abstract findByDetailsByOrderId(orderId: string): Promise<OrderDetails | null>
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

  abstract findManyOrdersWithRecipientByDeliverymanId(
    { page }: PaginationParams,
    deliverymanId: string,
  ): Promise<OrderWithRecipient[]>

  abstract findManyOrdesWithRecipientByRecipientId(
    { page }: PaginationParams,
    recipientId: string,
  ): Promise<OrderWithRecipient[]>

  abstract delete(order: Order): Promise<void>
  abstract save(order: Order): Promise<void>
}
