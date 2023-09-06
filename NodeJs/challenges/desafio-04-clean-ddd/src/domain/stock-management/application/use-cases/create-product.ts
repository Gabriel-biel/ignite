import { ProductsRepository } from '../repositories/products-repository'
import { Product } from '../../enterprise/product'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, rigth } from '@/core/either'
import { Stock } from '../../enterprise/stock'

export interface CreateProductUseCaseRequest {
  name: string
  managerId: string
  minimun: number
  current: number
  sizeProduct: string
  colorProduct: string
}

export type CreateProductUseCaseResponse = Either<null, { product: Product }>

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    managerId,
    minimun,
    current,
    sizeProduct,
    colorProduct,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      name,
      managerId: new UniqueEntityID(managerId),
      stock: Stock.create({
        current,
        minimun,
      }),
      sizeProduct,
      colorProduct,
    })

    // sobreescrita de productId para stock
    product.stock.productId = product.id

    await this.productsRepository.create(product)

    return rigth({ product })
  }
}
