import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from './address'

export interface RecipientProps {
  name: string
  email: string
  cpf: string
  address?: Address
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get cpf() {
    return this.props.cpf
  }

  get address() {
    return this.props.address
  }

  set address(address: Address | undefined) {
    this.props.address = address
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
      },
      id,
    )

    return recipient
  }
}
