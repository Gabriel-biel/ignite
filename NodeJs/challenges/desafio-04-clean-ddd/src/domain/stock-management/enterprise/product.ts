import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Stock } from './stock'

export interface ProductProps {
  managerId: UniqueEntityID
  name: string
  sizeProduct: string
  colorProduct: string
  stock: Stock
  createdAt: Date
  updatedAt?: Date
}

export class Product extends AggregateRoot<ProductProps> {
  get managerId() {
    return this.props.managerId
  }

  get sizeProduct() {
    return this.props.sizeProduct
  }

  set sizeProduct(size: string) {
    this.props.sizeProduct = size
    this.touch()
  }

  get colorProduct() {
    return this.props.colorProduct
  }

  set colorProduct(color: string) {
    this.props.colorProduct = color
    this.touch()
  }

  get stock() {
    return this.props.stock
  }

  set stock(stock: Stock) {
    this.props.stock = stock
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
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return product
  }
}
