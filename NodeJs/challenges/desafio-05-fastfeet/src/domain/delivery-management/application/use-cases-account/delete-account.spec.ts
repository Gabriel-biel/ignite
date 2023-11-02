import { MakeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { DeleteAccountUseCase } from './delete-account'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let deleteAccountUseCase: DeleteAccountUseCase

describe('Get account use case', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    deleteAccountUseCase = new DeleteAccountUseCase(inMemoryAccountsRepository)
  })

  it('should be able to get a account by id', async () => {
    const account = MakeAccount({}, new UniqueEntityID('account-id'))

    await inMemoryAccountsRepository.create(account)

    await deleteAccountUseCase.execute({
      accountId: account.id.toString(),
    })

    expect(inMemoryAccountsRepository.items).toHaveLength(0)
  })
})
