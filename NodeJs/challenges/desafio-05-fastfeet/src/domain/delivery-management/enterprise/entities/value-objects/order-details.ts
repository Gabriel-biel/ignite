import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Attachment } from '../attachment'

export interface OrderDetailsProps {
  orderId: UniqueEntityID
  recipientId: UniqueEntityID
  bestAddressId?: UniqueEntityID | null
  cpfRecipient: string
  recipientName: string
  recipientStreet: string
  recipientHouseNumber: string
  attachments: Attachment[]
  createdAt?: Date | null // to-fix: Date only
  updatedAt?: Date | null
}

export class OrderDetails extends ValueObject<OrderDetailsProps> {
  get orderId() {
    return this.props.orderId
  }

  get recipientId() {
    return this.props.recipientId
  }

  get bestAddressId() {
    return this.props.bestAddressId
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

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: OrderDetailsProps) {
    return new OrderDetails(props)
  }
}
