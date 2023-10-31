import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AccountProps {
  name: string
  email: string
  cpf: string
  password: string
  role: 'ADM' | 'RECIPIENT' | 'DELIVERYMAN' // test
}

export class Account extends Entity<AccountProps> {
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

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get role() {
    return this.props.role // test
  }

  set role(role: 'ADM' | 'DELIVERYMAN' | 'RECIPIENT') {
    this.props.role = role
  }

  static create(props: Optional<AccountProps, 'role'>, id?: UniqueEntityID) {
    const account = new Account(
      {
        ...props,
        role: props.role ?? 'ADM', // test
      },
      id,
    )

    return account
  }
}
