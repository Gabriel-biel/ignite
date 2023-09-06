import { Either, left, rigth } from '@/core/either'
import { ProductsRepository } from '../repositories/products-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/errors/not-allowed'

export interface DeleteProductUseCaseRequest {
  managerId: string
  productId: string
}
export type DeleteProductUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    managerId,
    productId,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    if (product.managerId.toString() !== managerId) {
      return left(new NotAllowedError())
    }

    await this.productsRepository.delete(product)

    return rigth({})
  }
}
