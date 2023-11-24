import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { AuthenticateAccountUseCase } from './authenticate-account'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { MakeAccount } from 'test/factories/make-account'

let inMemoryAccountRepository: InMemoryAccountsRepository
let fakeHasher: FakeHasher
let fakeEncrypt: FakeEncrypter
let authenticateAccountUseCase: AuthenticateAccountUseCase

describe('Authenticate account use case', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypt = new FakeEncrypter()
    authenticateAccountUseCase = new AuthenticateAccountUseCase(
      inMemoryAccountRepository,
      fakeHasher,
      fakeEncrypt,
    )
  })

  it('shloud be able to authenticate account', async () => {
    const account = MakeAccount({
      cpf: '123.456',
      password: await fakeHasher.hash('123456'),
    })

    // inMemoryAccountRepository.items.push(account)
    await inMemoryAccountRepository.create(account)

    const result = await authenticateAccountUseCase.execute({
      cpf: account.cpf,
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
