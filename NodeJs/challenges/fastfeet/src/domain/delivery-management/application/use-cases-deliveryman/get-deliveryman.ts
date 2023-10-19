import { Either, left, rigth } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'

export interface GetDeliverymanUseCaseRequest {
  deliverymanId: string
}

export type GetDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

export class GetDeliverymanUseCase {
  constructor(private deliverymansRepository: DeliverymanRepository) {}

  async execute({
    deliverymanId,
  }: GetDeliverymanUseCaseRequest): Promise<GetDeliverymanUseCaseResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    return rigth({ deliveryman })
  }
}
