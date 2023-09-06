import { Either, rigth } from '@/core/either'
import { Product } from '../../enterprise/product'
import { ProductsRepository } from '../repositories/products-repository'

export interface FetchProductUseCaseRequest {
  page: number
  sizeProduct?: string
  colorProduct?: string
}

export type SeacrhProductUseCaseResponse = Either<null, { product: Product[] }>

export class FetchProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    page,
    sizeProduct,
    colorProduct,
  }: FetchProductUseCaseRequest) {
    const products = await this.productsRepository.findManyByQuery(
      { page },
      sizeProduct,
      colorProduct,
    )

    return rigth({ products })
  }
}
