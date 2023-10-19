import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import { OrderRepository } from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  constructor(private orderAttachmentsRepository: OrderAttachmentsRepository) {}

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
  }
}
