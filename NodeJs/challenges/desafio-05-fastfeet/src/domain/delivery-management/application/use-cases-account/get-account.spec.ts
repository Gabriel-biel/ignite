import { MakeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { GetAccountUseCase } from './get-account'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let getAccountUseCase: GetAccountUseCase

describe('Get account use case', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    getAccountUseCase = new GetAccountUseCase(inMemoryAccountsRepository)
  })

  it('should be able to get a account by id', async () => {
    const account = MakeAccount({
      name: 'Gabriel',
      email: 'gabriel97gla98@gmail.com',
    })

    await inMemoryAccountsRepository.create(account)

    const result = await getAccountUseCase.execute({
      accountId: account.id.toString(),
    })

    expect(result.value).toBeTruthy()
    expect(result.value).toMatchObject({
      account: expect.objectContaining({
        name: 'Gabriel',
        email: 'gabriel97gla98@gmail.com',
      }),
    })
  })
})
