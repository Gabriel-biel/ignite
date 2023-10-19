import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-Event'
import { Order } from '../entities/order'

export class ChangeDeliverymanOrderEvent implements DomainEvent {
  public order: Order
  public changedeliverymanOrder: Date
  ocurredAt: Date

  constructor(order: Order, changedeliverymanOrder: Date) {
    this.order = order
    this.changedeliverymanOrder = changedeliverymanOrder
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.order.id
  }
}
