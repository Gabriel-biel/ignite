import { DomainEvent } from '@/core/events/domain-Event'
import { Order } from '../entities/order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PickupAvailableOrderEvent implements DomainEvent {
  public order: Order
  public pickupAvailableOrder: Date
  public ocurredAt: Date

  constructor(order: Order, pickupAvailableOrder: Date) {
    this.order = order
    this.pickupAvailableOrder = pickupAvailableOrder
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.order.id
  }
}
