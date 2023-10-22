import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import {
  FindManyNearbyParams,
  OrderRepository,
} from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { GetDistanceBetweenCoordinates } from 'test/utils/get-distance-between-coordinates'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  constructor(
    private orderAttachmentsRepository: OrderAttachmentsRepository,
    private addressRepository: AddressRepository,
  ) {}

  async create(order: Order) {
    this.items.push(order)
  }

  async findById(orderId: string) {
    const order = this.items.find((item) => item.id.toString() === orderId)

    if (!order) {
      return null
    }

    return order
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Order[]> {
    return this.items.filter(async (item) => {
      const recipientAddress = await this.addressRepository.findById(
        item.recipientId.toString(),
      )

      const distance = GetDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: recipientAddress.latitude,
          longitude: recipientAddress.longitude,
        },
      )
      return distance < 3
    })
  }

  async findManyByOrdersDeliveryman({ page }, deliverymanId: string) {
    const orders = this.items
      .filter((item) => item.deliverymanId?.toString() === deliverymanId)
      .sort()
      .splice((page - 1) * 20, page * 20)

    return orders
  }

  async findManyByOrdersRecipient(
    { page }: PaginationParams,
    recipientId: string,
  ) {
    const orders = this.items
      .filter((item) => item.recipientId.toString() === recipientId)
      .sort()
      .slice((page - 1) * 20, page * 20)
    return orders
  }

  async delete(order: Order) {
    const item = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(item, 1)
    this.orderAttachmentsRepository.deleteByManyOrderId(order.id.toString())
  }

  async save(order: Order) {
    const item = this.items.findIndex((item) => item.id === order.id)

    this.items[item] = order

    DomainEvents.dispatchEventsForAggregate(order.id)
  }
}
