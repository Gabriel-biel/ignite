import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-Event'
import { Order } from '../entities/order'

export class ReturnedOrderEvent implements DomainEvent {
  public order: Order
  public returnedOrder: Date
  ocurredAt: Date

  constructor(order: Order, returnedOrder: Date) {
    this.order = order
    this.returnedOrder = returnedOrder
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.order.id
  }
}
