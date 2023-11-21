import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface OrderWithRecipientProps {
  orderId: UniqueEntityID
  recipientId: UniqueEntityID
  cpfRecipient: string
  recipientName: string
  recipientStreet: string
  recipientHouseNumber: string
  createdAt?: Date | null // to-fix: Date only
  updatedAt?: Date | null
}

export class OrderWithRecipient extends ValueObject<OrderWithRecipientProps> {
  get orderId() {
    return this.props.orderId
  }

  get recipientId() {
    return this.props.recipientId
  }

  get cpfRecipient() {
    return this.props.cpfRecipient
  }

  get recipientName() {
    return this.props.recipientName
  }

  get recipientStreet() {
    return this.props.recipientStreet
  }

  get recipientHouseNumber() {
    return this.props.recipientHouseNumber
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: OrderWithRecipientProps) {
    return new OrderWithRecipient(props)
  }
}
