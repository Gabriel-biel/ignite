import { ValueObject } from '@/core/entities/value-object'
import { OrderAttachmentList } from '../order-attachment-list'

export interface OrderWithRecipientProps {
  orderId: string
  deliverymanId: string
  attachments: OrderAttachmentList
  nameRecipient: string
  streetRecipient: string
  houseNumberRecipient: string
  cpfRecipient: string
  createdAt: Date
  updatedAt?: Date | null
}

export class OrderWithRecipient extends ValueObject<OrderWithRecipientProps> {
  get orderId() {
    return this.props.orderId
  }

  get deliverymanId() {
    return this.props.deliverymanId
  }

  get attachments() {
    return this.props.attachments
  }

  get nameRecipient() {
    return this.props.nameRecipient
  }

  get streetRecipient() {
    return this.props.streetRecipient
  }

  get houseNumberRecipient() {
    return this.props.houseNumberRecipient
  }

  get cpfRecipient() {
    return this.props.cpfRecipient
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
