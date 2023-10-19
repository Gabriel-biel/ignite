import { Either, left, rigth } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanAlreadyExists } from '../errors/deliveryman-already-exists'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { Deliveryman } from '../../enterprise/entities/deliveryman'

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
    const studentWithSameCpf = await this.deiverymanRepository.findByCpf(cpf)

    if (studentWithSameCpf) {
      return left(new DeliverymanAlreadyExists(cpf))
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
