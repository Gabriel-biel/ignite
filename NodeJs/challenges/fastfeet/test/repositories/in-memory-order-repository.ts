import { OrderRepository } from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entity/order'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

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

  async delete(order: Order) {
    const item = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(item, 1)
  }

  async save(order: Order) {
    const item = this.items.findIndex((item) => item.id === order.id)

    this.items[item] = order
  }
}
