import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { HashGenerator } from '../cryptography/hash-generator'

export interface EditDeliverymanUseCaseRequest {
  deliverymanId: string
  name: string
  email: string
  password: string
}

export type EditDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    deliveryman: Deliveryman
  }
>

export class EditDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    deliverymanId,
    name,
    email,
    password,
  }: EditDeliverymanUseCaseRequest): Promise<EditDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    if (deliverymanId !== deliveryman.id.toString()) {
      return left(new NotAllowedError())
    }

    const hashPassword = await this.hashGenerator.hash(password)

    deliveryman.name = name
    deliveryman.email = email
    deliveryman.password = hashPassword

    await this.deliverymanRepository.save(deliveryman)

    return right({ deliveryman })
  }
}
