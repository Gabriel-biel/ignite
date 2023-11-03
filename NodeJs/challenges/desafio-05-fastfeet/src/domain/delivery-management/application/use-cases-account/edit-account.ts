import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Account } from '../../enterprise/entities/account'
import { AccountRepository } from '../repositories/account-repository'
import { HashGenerator } from '../cryptography/hash-generator'

export interface EditAccountUseCaseRequest {
  accountId: string
  name: string
  email: string
  password: string
}

export type EditAccountUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    account: Account
  }
>

export class EditAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    accountId,
    name,
    email,
    password,
  }: EditAccountUseCaseRequest): Promise<EditAccountUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    if (accountId !== account.id.toString()) {
      return left(new NotAllowedError())
    }

    const hashPassword = await this.hashGenerator.hash(password)

    account.name = name
    account.email = email
    account.password = hashPassword

    await this.accountRepository.save(account)

    return right({ account })
  }
}
