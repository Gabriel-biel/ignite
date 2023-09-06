import { Product } from '../../enterprise/product'
import { Either, left, rigth } from '@/core/either'
import { ProductsRepository } from '../repositories/products-repository'
import { InsuficientResource } from '@/core/errors/errors/insuficient-resource'

export interface GetProcuctByIdUseCaseRequest {
  productId: string
}
export type GetProcuctByIdUseCaseResponse = Either<
  InsuficientResource,
  { product: Product }
>

export class GetProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: GetProcuctByIdUseCaseRequest): Promise<GetProcuctByIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new InsuficientResource())
    }

    return rigth({ product })
  }
}
