import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AccountRepository } from '../repositories/account-repository'

export interface DeleteAccountUseCaseRequest {
  accountId: string
}

export type DeleteAccountUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAccountUseCase {
  constructor(private accountsRepository: AccountRepository) {}

  async execute({
    accountId,
  }: DeleteAccountUseCaseRequest): Promise<DeleteAccountUseCaseResponse> {
    const account = await this.accountsRepository.findById(accountId)

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    await this.accountsRepository.delete(account)

    return right(null)
  }
}
