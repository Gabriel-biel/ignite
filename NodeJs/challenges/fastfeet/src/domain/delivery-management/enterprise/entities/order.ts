import { Optional } from '@/core/@types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderAttachmentList } from './order-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { PickupAvailableOrderEvent } from '../events/pickup-available-order-event'
import { DeliveredOrderEvent } from '../events/delivered-order-event'
import { ReturnedOrderEvent } from '../events/returned-order-event'

export interface OrderProps {
  recipientId: UniqueEntityID
  deliverymanId?: UniqueEntityID
  pickup_available_order?: Date
  delivered_at?: Date
  returned_at?: Date
  attachments: OrderAttachmentList
  created_at?: Date
  updated_at?: Date
}

export class Order extends AggregateRoot<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get deliverymanId() {
    return this.props.deliverymanId
  }

  get pickup_available_order() {
    return this.props.pickup_available_order
  }

  set pickup_available_order(pickupAvailableOrder: Date | undefined) {
    if (
      pickupAvailableOrder &&
      pickupAvailableOrder !== this.props.pickup_available_order
    ) {
      this.addDomainEvent(
        new PickupAvailableOrderEvent(this, pickupAvailableOrder),
      )
    }

    this.props.pickup_available_order = pickupAvailableOrder
    this.touch()
  }

  get delivered_at() {
    return this.props.delivered_at
  }

  set delivered_at(deliveryAt: Date | undefined) {
    if (deliveryAt && deliveryAt !== this.props.delivered_at) {
      this.addDomainEvent(new DeliveredOrderEvent(this, deliveryAt))
    }

    this.props.delivered_at = deliveryAt
    this.touch()
  }

  get returned_at() {
    return this.props.returned_at
  }

  set returned_at(returnedAt: Date | undefined) {
    if (returnedAt && returnedAt !== this.returned_at) {
      this.addDomainEvent(new ReturnedOrderEvent(this, returnedAt))
    }

    this.props.returned_at = returnedAt
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: OrderAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  static create(
    props: Optional<OrderProps, 'created_at' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        attachments: props.attachments ?? new OrderAttachmentList(),
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return order
  }
}
