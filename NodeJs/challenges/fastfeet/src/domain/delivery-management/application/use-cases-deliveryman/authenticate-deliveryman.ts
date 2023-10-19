import { Either, left, rigth } from '@/core/either'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encypter'

export interface AuthenticateDeliverymanUseCaseRequest {
  cpf: string
  password: string
}

export type AuthenticateDeliverymanUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateDeliverymanUseCase {
  constructor(
    private deliverymansRepository: DeliverymanRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDeliverymanUseCaseRequest): Promise<AuthenticateDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymansRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new WrongCredentialsError())
    }

    const hashedPassword = await this.hashCompare.compare(
      password,
      deliveryman.password,
    )

    if (!hashedPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryman.id.toString(),
    })

    return rigth({ accessToken })
  }
}
