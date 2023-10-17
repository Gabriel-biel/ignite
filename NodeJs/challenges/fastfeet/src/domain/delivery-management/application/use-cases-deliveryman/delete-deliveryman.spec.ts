import { MakeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { DeleteDeliverymanUseCase } from './delete-deliveryman'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase

describe('Get deliveryman (e2e)', () => {
  beforeEach(() => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository()
    deleteDeliverymanUseCase = new DeleteDeliverymanUseCase(
      inMemoryDeliverymansRepository,
    )
  })

  it('should be able to get a deliveryman by id', async () => {
    const deliveryman = MakeDeliveryman(
      {},
      new UniqueEntityID('deliveryman-id'),
    )

    await inMemoryDeliverymansRepository.create(deliveryman)

    await deleteDeliverymanUseCase.execute({
      deliverymanId: deliveryman.id.toString(),
    })

    expect(inMemoryDeliverymansRepository.items).toHaveLength(0)
  })
})
