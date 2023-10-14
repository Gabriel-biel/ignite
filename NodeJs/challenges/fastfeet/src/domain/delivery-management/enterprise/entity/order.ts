import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface OrderProps {
  recipientId: UniqueEntityID
  order_available?: Date
  pick_up_order?: Date
  delivered_at?: Date
  returned_at?: Date
  created_at?: Date
}

export class Order extends Entity<OrderProps> {
  get order_available() {
    return this.props.order_available
  }

  get pick_up_order() {
    return this.props.pick_up_order
  }

  get delivered_at() {
    return this.props.delivered_at
  }

  get returned_at() {
    return this.props.returned_at
  }

  static create(
    props: Optional<
      OrderProps,
      'order_available' | 'pick_up_order' | 'delivered_at' | 'returned_at'
    >,
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
