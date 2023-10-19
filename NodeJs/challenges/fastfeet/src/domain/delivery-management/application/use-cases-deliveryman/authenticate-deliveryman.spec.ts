import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { AuthenticateDeliverymanUseCase } from './authenticate-deliveryman'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { MakeDeliveryman } from 'test/factories/make-deliveryman'

let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let fakeHasher: FakeHasher
let fakeEncrypt: FakeEncrypter
let authenticateDeliverymanUseCase: AuthenticateDeliverymanUseCase

describe('Authenticate deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypt = new FakeEncrypter()
    authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
      fakeEncrypt,
    )
  })

  it('shloud be able to authenticate deliveryman', async () => {
    const deliveryman = MakeDeliveryman({
      cpf: '123.456',
      password: await fakeHasher.hash('123456'),
    })

    // inMemoryDeliverymanRepository.items.push(deliveryman)
    await inMemoryDeliverymanRepository.create(deliveryman)

    const result = await authenticateDeliverymanUseCase.execute({
      cpf: deliveryman.cpf,
      password: '123456',
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
