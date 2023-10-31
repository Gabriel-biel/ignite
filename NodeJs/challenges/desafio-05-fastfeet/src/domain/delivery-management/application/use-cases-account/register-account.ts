import { Either, left, right } from '@/core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { AccountAlreadyExists } from '../errors/account-already-exists'
import { AccountRepository } from '../repositories/account-repository'
import { Account } from '../../enterprise/entities/account'
import { Injectable } from '@nestjs/common'

export interface RegisterUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
  role?: 'ADM' | 'DELIVERYMAN' | 'RECIPIENT'
}

export type RegisterUseCaseResponse = Either<
  AccountAlreadyExists,
  {
    account: Account
  }
>

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    cpf,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const accountWithSameCpf = await this.accountRepository.findByCpf(cpf)

    if (accountWithSameCpf) {
      return left(new AccountAlreadyExists(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const account = Account.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      role,
    })

    await this.accountRepository.create(account)

    return right({ account })
  }
}
