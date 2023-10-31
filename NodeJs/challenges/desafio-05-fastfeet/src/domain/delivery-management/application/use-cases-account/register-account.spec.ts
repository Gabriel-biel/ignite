import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { RegisterAccountUseCase } from './register-account'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryAccountRepository: InMemoryAccountsRepository
let registerDelivermanUseCase: RegisterAccountUseCase
let fakeHasher: FakeHasher

describe('Register account use case', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    fakeHasher = new FakeHasher()
    registerDelivermanUseCase = new RegisterAccountUseCase(
      inMemoryAccountRepository,
      fakeHasher,
    )
  })
  it('should be able to register account for deliveryman', async () => {
    const result = await registerDelivermanUseCase.execute({
      name: 'Gabriel Lima',
      email: 'gabriel97gla98@gmail.com',
      cpf: '000.000.000.00',
      password: await fakeHasher.hash('123456'),
      role: 'DELIVERYMAN',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      account: inMemoryAccountRepository.items[0],
    })
  })

  it('should be able to register a adm', async () => {
    const result = await registerDelivermanUseCase.execute({
      name: 'Gabriel Lima',
      email: 'gabriel97gla98@gmail.com',
      cpf: '000.000.000.00',
      password: await fakeHasher.hash('123456'),
      role: 'ADM',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      account: inMemoryAccountRepository.items[0],
    })
  })
})
