import { Either, left, rigth } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanAlreadyExists } from '../errors/deliverymanAlreadyExists'
import { DeliverymanRepository } from '../repositories/deliveryman'
import { Deliveryman } from '../../enterprise/entity/deliveryman'

export interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

export type RegisterStudentUseCaseResponse = Either<
  DeliverymanAlreadyExists,
  {
    deliveryman: Deliveryman
  }
>

export class RegisterStudentUseCase {
  constructor(
    private deiverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    cpf,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
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
