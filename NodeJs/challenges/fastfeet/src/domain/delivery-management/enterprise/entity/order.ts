import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface OrderProps {
  recipientId: UniqueEntityID
  order_available?: Date
  pickup_available_order?: Date
  delivered_at?: Date
  returned_at?: Date
  created_at?: Date
}

export class Order extends Entity<OrderProps> {
  get order_available() {
    return this.props.order_available
  }

  set order_available(orderAvailable: Date | undefined) {
    this.props.order_available = orderAvailable
  }

  get pickup_available_order() {
    return this.props.pickup_available_order
  }

  set pickup_available_order(pickupAvailableOrder: Date | undefined) {
    this.props.pickup_available_order = pickupAvailableOrder
  }

  get delivered_at() {
    return this.props.delivered_at
  }

  set delivered_at(deliveryAt: Date | undefined) {
    this.props.delivered_at = deliveryAt
  }

  get returned_at() {
    return this.props.returned_at
  }

  set returned_at(returnedAt: Date | undefined) {
    this.props.returned_at = returnedAt
  }

  static create(
    props: Optional<OrderProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return order
  }
}
