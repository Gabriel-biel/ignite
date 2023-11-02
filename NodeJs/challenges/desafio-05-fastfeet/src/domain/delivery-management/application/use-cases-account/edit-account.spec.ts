import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MakeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { EditAccountUseCase } from './edit-account'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryAccountRepository: InMemoryAccountsRepository
let fakeHasher: FakeHasher
let editAccountUseCase: EditAccountUseCase

describe('Edit account use case', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    fakeHasher = new FakeHasher()
    editAccountUseCase = new EditAccountUseCase(
      inMemoryAccountRepository,
      fakeHasher,
    )
  })

  it('Should be able to edit account', async () => {
    const deliverman = MakeAccount(
      {
        email: 'gabriel@gmail.com',
      },
      new UniqueEntityID('1'),
    )

    await inMemoryAccountRepository.create(deliverman)

    const result = await editAccountUseCase.execute({
      accountId: '1',
      name: 'Gabs',
      email: 'gabriel97gla@gmail.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAccountRepository.items).toHaveLength(1)
    expect(inMemoryAccountRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Gabs',
      }),
    )
  })
})
