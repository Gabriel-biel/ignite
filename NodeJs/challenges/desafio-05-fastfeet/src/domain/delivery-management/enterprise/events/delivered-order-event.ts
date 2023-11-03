import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-Event'
import { Order } from '../entities/order'

export class DeliveredOrderEvent implements DomainEvent {
  public order: Order
  public deliveredOrder: Date
  public ocurredAt: Date

  constructor(order: Order, deliveredOrder: Date) {
    this.order = order
    this.deliveredOrder = deliveredOrder
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.order.id
  }
}
