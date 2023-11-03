import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'
import { AccountRepository } from '../repositories/account-repository'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encypter'
import { Injectable } from '@nestjs/common'

export interface AuthenticateAccountUseCaseRequest {
  cpf: string
  password: string
}

export type AuthenticateAccountUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateAccountUseCase {
  constructor(
    private accountsRepository: AccountRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateAccountUseCaseRequest): Promise<AuthenticateAccountUseCaseResponse> {
    const account = await this.accountsRepository.findByCpf(cpf)

    if (!account) {
      return left(new WrongCredentialsError())
    }

    const hashedPassword = await this.hashCompare.compare(
      password,
      account.password,
    )

    if (!hashedPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: account.id.toString(),
    })

    return right({ accessToken })
  }
}
