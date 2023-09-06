import { Either, left, rigth } from '@/core/either'
import { Product } from '../../enterprise/product'
import { ProductsRepository } from '../repositories/products-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'

export interface EditProductUseCaseRequest {
  managerId: string
  productId: string
  minimun?: number
  current?: number
}

export type EditProductUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { product: Product }
>

export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    managerId,
    productId,
    minimun,
    current,
  }: EditProductUseCaseRequest) {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    if (managerId !== product?.managerId.toString()) {
      return left(new NotAllowedError())
    }

    if (minimun) {
      product.stock.minimun = minimun
    }

    if (current) {
      product.stock.current = current
    }

    await this.productsRepository.save(product)

    return rigth({ product })
  }
}
