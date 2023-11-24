import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Account } from '../../enterprise/entities/account'
import { AccountRepository } from '../repositories/account-repository'
import { Injectable } from '@nestjs/common'

export interface GetAccountUseCaseRequest {
  accountId: string
}

export type GetAccountUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    account: Account
  }
>

@Injectable()
export class GetAccountUseCase {
  constructor(private accountsRepository: AccountRepository) {}

  async execute({
    accountId,
  }: GetAccountUseCaseRequest): Promise<GetAccountUseCaseResponse> {
    const account = await this.accountsRepository.findById(accountId)

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    return right({ account })
  }
}
