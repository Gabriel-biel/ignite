import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'

export interface DeleteDeliverymanUseCaseRequest {
  deliverymanId: string
}

export type DeleteDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteDeliverymanUseCase {
  constructor(private deliverymansRepository: DeliverymanRepository) {}

  async execute({
    deliverymanId,
  }: DeleteDeliverymanUseCaseRequest): Promise<DeleteDeliverymanUseCaseResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    await this.deliverymansRepository.delete(deliveryman)

    return right(null)
  }
}
