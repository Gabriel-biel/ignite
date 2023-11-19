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

  async findManyNearby({
    deliverymanId,
    latitude,
    longitude,
  }: FindManyNearbyParams) {
    const orders = this.items.filter(
      (item) =>
        item.deliverymanId?.toString() === deliverymanId &&
        !item.delivered_at &&
        !item.returned_at,
    )

    const nearby = orders.filter(async (item) => {
      const address = await this.addressRepository.findById(
        item.addressId.toString(),
      )

      if (!address) {
        throw new Error(
          `no address found with this id: ${item.addressId.toString()}`,
        )
      }

      const distance = GetDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: address.latitude,
          longitude: address.longitude,
        },
      )

      return distance < 1
    })

    return nearby
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

    if (order.attachments) {
      await this.orderAttachmentsRepository.createMany(
        order.attachments.getNewItems(),
      )

      await this.orderAttachmentsRepository.deleteMany(
        order.attachments.getRemovedItems(),
      )
    }

    this.items[item] = order

    DomainEvents.dispatchEventsForAggregate(order.id)
  }
}
