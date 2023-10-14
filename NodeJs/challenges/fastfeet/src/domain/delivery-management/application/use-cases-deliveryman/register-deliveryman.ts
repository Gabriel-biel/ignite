import { Either, left, rigth } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanAlreadyExists } from '../errors/deliverymanAlreadyExists'
import { DeliverymanRepository } from '../repositories/deliveryman'
import { Deliveryman } from '../../enterprise/entity/deliveryman'

export interface RegisterDeliverymanUseCaseRequest {
  name: string
  email: string
  cpf: string
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
    password,
  }: RegisterDeliverymanUseCaseRequest): Promise<RegisterDeliverymanUseCaseResponse> {
    const studentWithSameEmail =
      await this.deiverymanRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new DeliverymanAlreadyExists(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryman = Deliveryman.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    })

    await this.deiverymanRepository.create(deliveryman)

    return rigth({ deliveryman })
  }
}
