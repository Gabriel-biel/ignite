import { Either, left, rigth } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanAlreadyExists } from '../errors/deliveryman-already-exists'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { Address } from '../../enterprise/entities/address'

export interface RegisterDeliverymanUseCaseRequest {
  name: string
  email: string
  cpf: string
  address?: Address
  password: string
}

export type RegisterDeliverymanUseCaseResponse = Either<
  DeliverymanAlreadyExists,
  {
    deliveryman: Deliveryman
  }
>

export class RegisterDeliverymanUseCase {
  constructor(
    private deiverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    cpf,
    address,
    password,
  }: RegisterDeliverymanUseCaseRequest): Promise<RegisterDeliverymanUseCaseResponse> {
    const deliverymanWithSameCpf =
      await this.deiverymanRepository.findByCpf(cpf)

    if (deliverymanWithSameCpf) {
      return left(new DeliverymanAlreadyExists(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryman = Deliveryman.create({
      name,
      email,
      cpf,
      address,
      password: hashedPassword,
    })

    await this.deiverymanRepository.create(deliveryman)

    return rigth({ deliveryman })
  }
}
