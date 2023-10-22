import { DomainEvent } from '@/core/events/domain-Event'
import { Order } from '../entities/order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PickupOrderEvent implements DomainEvent {
  public order: Order
  public pickupOrder: Date
  public ocurredAt: Date

  constructor(order: Order, pickupOrder: Date) {
    this.order = order
    this.pickupOrder = pickupOrder
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.order.id
  }
}
