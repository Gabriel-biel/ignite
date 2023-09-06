import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ManagerProps {
  name: string
}

export class Manager extends Entity<ManagerProps> {
  get name() {
    return this.props.name
  }

  static create(props: ManagerProps, id?: UniqueEntityID) {
    const manager = new Manager(
      {
        ...props,
      },
      id,
    )

    return manager
  }
}
