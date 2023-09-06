import { ProductsRepository } from '../repositories/products-repository'
import { Product } from '../../enterprise/product'
import { Either, left, rigth } from '@/core/either'
import { InsuficientResource } from '@/core/errors/errors/insuficient-resource'

export interface SellProductUseCaseRequest {
  products: Array<{
    id: string
    amount: number
  }>
}

export type SellProductUseCaseResponse = Either<
  InsuficientResource,
  { products: Product[] }
>

export class SellProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    products,
  }: SellProductUseCaseRequest): Promise<SellProductUseCaseResponse> {
    const productsIds = products.map((item) => item.id)
    const productsFound = await this.productsRepository.findByIds(productsIds)

    for (const productFound of productsFound) {
      const product = products.find(
        (product) => product.id === productFound.id.toString(),
      )

      if (product) {
        const resultProductCurrentStock =
          productFound.stock.current - product.amount

        if (resultProductCurrentStock < 0) {
          return left(new InsuficientResource())
        }

        productFound.stock.decrease(product.amount)
      }
    }

    await this.productsRepository.saveMany(productsFound)

    return rigth({ products: productsFound })
  }
}
