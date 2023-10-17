import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { RegisterDeliverymanUseCase } from './register-deliveryman'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryDeliveryManRepository: InMemoryDeliverymansRepository
let registerDelivermanUseCase: RegisterDeliverymanUseCase
let fakeHasher: FakeHasher

describe('Register deliveryman (e2e)', () => {
  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliverymansRepository()
    fakeHasher = new FakeHasher()
    registerDelivermanUseCase = new RegisterDeliverymanUseCase(
      inMemoryDeliveryManRepository,
      fakeHasher,
    )
  })
  it('should be able to register deliveryman', async () => {
    const result = await registerDelivermanUseCase.execute({
      name: 'Gabriel Lima',
      email: 'gabriel97gla98@gmail.com',
      cpf: '000.000.000.00',
      password: await fakeHasher.hash('123456'),
    })

    expect(result.isRigth()).toBe(true)
    expect(result.value).toEqual({
      deliveryman: inMemoryDeliveryManRepository.items[0],
    })
  })
})
