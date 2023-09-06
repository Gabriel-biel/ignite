import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface StockProps {
  productId: UniqueEntityID
  minimun: number
  current: number
  updatedAt?: Date
}

export class Stock extends Entity<StockProps> {
  get productId() {
    return this.props.productId
  }

  set productId(productId: UniqueEntityID) {
    this.props.productId = productId
  }

  get minimun() {
    return this.props.minimun
  }

  set minimun(minimun: number) {
    this.props.minimun = minimun
    this.touch()
  }

  get current() {
    return this.props.current
  }

  set current(current: number) {
    this.props.current = current
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  decrease(amount: number) {
    this.props.current = this.props.current - amount
    this.touch()
  }

  static create(
    props: Optional<StockProps, 'updatedAt' | 'productId'>,
    id?: UniqueEntityID,
  ) {
    const stock = new Stock(
      {
        ...props,
        productId: props.productId ?? new UniqueEntityID(),
        updatedAt: new Date(),
      },
      id,
    )

    return stock
  }
}
