import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientAddressProps {
  recipientId: UniqueEntityID
  addressId: UniqueEntityID
}

export class RecipientAddress extends Entity<RecipientAddressProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get address() {
    return this.props.addressId
  }

  static create(props: RecipientAddressProps, id?: UniqueEntityID) {
    const recipientAddress = new RecipientAddress(props, id)

    return recipientAddress
  }
}
