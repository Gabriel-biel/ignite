import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstructorProps {
  name: string
  email: string
  password: string
  role: 'INSTRUCTOR' | 'STUDENT'
}

export class Instructor extends Entity<InstructorProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  static create(props: Optional<InstructorProps, 'role'>, id?: UniqueEntityID) {
    const instructor = new Instructor(
      {
        role: props.role ?? 'INSTRUCTOR',
        ...props,
      },
      id,
    )
    return instructor
  }
}
