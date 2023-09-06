import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface HistoricProps {
  productId: UniqueEntityID
  sold: number
  createdAt: Date
  updatedAt?: Date
}

export class Historic extends Entity<HistoricProps> {
  get sold() {
    return this.props.sold
  }

  set sold(sold: number) {
    this.props.sold = +sold
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<HistoricProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const historic = new Historic(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return historic
  }
}
