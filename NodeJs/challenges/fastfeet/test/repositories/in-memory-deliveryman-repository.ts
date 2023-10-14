import { DeliverymanRepository } from '@/domain/delivery-management/application/repositories/deliveryman'
import { Deliveryman } from '@/domain/delivery-management/enterprise/entity/deliveryman'

export class InMemoryDeliverymansRepository implements DeliverymanRepository {
  public items: Deliveryman[] = []

  async create(deliveryman: Deliveryman) {
    this.items.push(deliveryman)

    // DomainEvents.dispatchEventsForAggregate(deliveryman.id)
  }

  async findById(deliverymanId: string) {
    const deliveryman = this.items.find(
      (item) => item.id.toString() === deliverymanId,
    )

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async findByEmail(email: string) {
    const deliveryman = this.items.find((item) => item.email === email)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async delete(deliveryman: Deliveryman) {
    const item = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items.splice(item, 1)
  }

  async save(deliveryman: Deliveryman) {
    const item = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items[item] = deliveryman
  }
}
