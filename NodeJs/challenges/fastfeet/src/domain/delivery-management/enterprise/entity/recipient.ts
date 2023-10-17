import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
  email: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.email
  }

  set email(email: string) {
    this.props.email = email
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
