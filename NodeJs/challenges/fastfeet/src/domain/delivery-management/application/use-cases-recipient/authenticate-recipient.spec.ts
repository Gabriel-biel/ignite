import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { AuthenticateRecipientUseCase } from './authenticate-recipient'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { MakeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let fakeHasher: FakeHasher
let fakeEncrypt: FakeEncrypter
let authenticateRecipientUseCase: AuthenticateRecipientUseCase

describe('Authenticate recipient use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypt = new FakeEncrypter()
    authenticateRecipientUseCase = new AuthenticateRecipientUseCase(
      inMemoryRecipientRepository,
      fakeHasher,
      fakeEncrypt,
    )
  })

  it('shloud be able to authenticate recipient', async () => {
    const recipient = MakeRecipient({
      cpf: '123.456',
      password: await fakeHasher.hash('123456'),
    })

    // inMemoryRecipientRepository.items.push(recipient)
    await inMemoryRecipientRepository.create(recipient)

    const result = await authenticateRecipientUseCase.execute({
      cpf: recipient.cpf,
      password: '123456',
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
