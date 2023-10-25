import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MakeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { EditDeliverymanUseCase } from './edit-deliveryman'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryDeliverymanRepository: InMemoryDeliverymansRepository
let fakeHasher: FakeHasher
let editDeliverymanUseCase: EditDeliverymanUseCase

describe('Edit deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymansRepository()
    fakeHasher = new FakeHasher()
    editDeliverymanUseCase = new EditDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
    )
  })

  it('Should be able to edit deliveryman', async () => {
    const deliverman = MakeDeliveryman(
      {
        email: 'gabriel@gmail.com',
      },
      new UniqueEntityID('1'),
    )

    await inMemoryDeliverymanRepository.create(deliverman)

    const result = await editDeliverymanUseCase.execute({
      deliverymanId: '1',
      name: 'Gabs',
      email: 'gabriel97gla@gmail.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliverymanRepository.items).toHaveLength(1)
    expect(inMemoryDeliverymanRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Gabs',
      }),
    )
  })
})
