import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
  email: string
  cpf: string
  bestAddressId?: UniqueEntityID | null
  role: 'ADM' | 'RECIPIENT' | 'DELIVERYMAN' // test
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

  get bestAddressId() {
    return this.props.bestAddressId
  }

  set bestAddressId(bestAddressId: UniqueEntityID | undefined | null) {
    this.props.bestAddressId = bestAddressId
  }

  // test
  get role() {
    return this.props.role
  }

  static create(props: Optional<RecipientProps, 'role'>, id?: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
        role: props.role ?? 'RECIPIENT', // test
      },
      id,
    )

    return recipient
  }
}
