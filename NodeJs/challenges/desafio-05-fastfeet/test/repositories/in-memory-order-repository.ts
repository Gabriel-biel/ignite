import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyParams,
  OrderRepository,
} from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { GetDistanceBetweenCoordinates } from 'test/utils/get-distance-between-coordinates'
import { OrderWithRecipient } from '@/domain/delivery-management/enterprise/entities/value-objects/order-with-recipient'
import { InMemoryAddressRepository } from './in-memory-address-repository'
import { InMemoryRecipientRepository } from './in-memory-recipient-repository'
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryOrderAttachmentsRepository } from './in-memory-order-attachments-repository'
import { OrderDetails } from '@/domain/delivery-management/enterprise/entities/value-objects/order-details'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  constructor(
    private orderAttachmentsRepository: InMemoryOrderAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private recipientRepository: InMemoryRecipientRepository,
    private addressRepository: InMemoryAddressRepository,
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

  async findByDetailsByOrderId(orderId: string) {
    const order = this.items.find((item) => item.id.toString() === orderId)

    if (!order) {
      return null
    }

    const recipient = this.recipientRepository.items.find((recipient) => {
      return recipient.id.equals(order.recipientId)
    })

    if (!recipient) {
      throw new Error(`Recipient with ID ${order.recipientId} does not exists`)
    }

    const bestAddress = this.addressRepository.items.find((address) => {
      if (recipient.bestAddressId) {
        return address.id.equals(recipient.bestAddressId)
      }

      return address.id.equals(order.addressId)
    })

    if (!bestAddress) {
      throw new Error(`Address with ${bestAddress} does not exist`)
    }

    const orderAttachments = this.orderAttachmentsRepository.items.filter(
      (orderAttachment) => {
        return orderAttachment.orderId.equals(order.id)
      },
    )

    const attachments = orderAttachments.map((orderAttachment) => {
      const attachment = this.attachmentsRepository.items.find((attachment) => {
        return attachment.id.equals(orderAttachment.attachmentId)
      })

      if (!attachment) {
        throw new Error(
          `Attachment with ID ${orderAttachment.attachmentId} does not exists`,
        )
      }

      return attachment
    })

    return OrderDetails.create({
      orderId: order.id,
      recipientId: order.recipientId,
      bestAddressId: order.addressId,
      cpfRecipient: recipient.cpf,
      recipientName: recipient.name,
      recipientStreet: bestAddress.street,
      recipientHouseNumber: bestAddress.house_number,
      attachments,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })
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

  async findManyByOrdersDeliveryman({ page }, deliverymanId: string) {
    const orders = this.items
      .filter((item) => item.deliverymanId?.toString() === deliverymanId)
      .sort()
      .splice((page - 1) * 10, page * 10)

    return orders
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

  async findManyOrdersWithRecipientByDeliverymanId(
    { page }: PaginationParams,
    deliverymanId: string,
  ) {
    const orderWithRecipient = this.items
      .filter((item) => item.deliverymanId?.toString() === deliverymanId)
      .slice(page - 1, page * 10)
      .map((order) => {
        const recipient = this.recipientRepository.items.find((recipient) => {
          return recipient.id.equals(order.recipientId)
        })

        if (!recipient) {
          throw new Error(
            `Recipient with ID "${order.recipientId.toString()}" does not exist.`,
          )
        }

        const address = this.addressRepository.items.find(
          (address) => address.id === order.addressId,
        )

        if (!address) {
          throw new Error(
            `Address this RecipientID "${recipient.id.toString()}" does not exists.`,
          )
        }

        return OrderWithRecipient.create({
          orderId: order.id,
          recipientId: order.recipientId,
          cpfRecipient: recipient.cpf,
          recipientName: recipient.name,
          recipientHouseNumber: address.house_number,
          recipientStreet: address.street,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
        })
      })

    return orderWithRecipient
  }

  async findManyOrdesWithRecipientByRecipientId(
    { page }: PaginationParams,
    recipientId: string,
  ) {
    const ordersWithRecipient = this.items
      .filter((item) => item.recipientId.toString() === recipientId)
      .slice(page - 1, page * 10)
      .map((order) => {
        const recipient = this.recipientRepository.items.find((recipient) => {
          return recipient.id.equals(order.recipientId)
        })

        if (!recipient) {
          throw new Error(
            `Recipient with ID '${order.recipientId}' does not exits`,
          )
        }

        const address = this.addressRepository.items.find((address) => {
          return address.id.equals(order.addressId)
        })

        if (!address) {
          throw new Error(
            `Address with ID "${order.addressId}" does not exists`,
          )
        }

        return OrderWithRecipient.create({
          orderId: order.id,
          recipientId: order.recipientId,
          cpfRecipient: recipient.cpf,
          recipientName: recipient.name,
          recipientStreet: address.street,
          recipientHouseNumber: address.house_number,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
        })
      })

    return ordersWithRecipient
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
