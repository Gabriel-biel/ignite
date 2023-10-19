import { Either, left, rigth } from '@/core/either'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encypter'
import { RecipientRepository } from '../repositories/recipient-respository'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'

export interface AuthenticateRecipientUseCaseRequest {
  cpf: string
  password: string
}

export type AuthenticateRecipientUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateRecipientUseCase {
  constructor(
    private recipientsRepository: RecipientRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateRecipientUseCaseRequest): Promise<AuthenticateRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findByCpf(cpf)

    if (!recipient) {
      return left(new WrongCredentialsError())
    }

    const hashedPassword = await this.hashCompare.compare(
      password,
      recipient.password,
    )

    if (!hashedPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: recipient.id.toString(),
    })

    return rigth({ accessToken })
  }
}
