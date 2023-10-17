import { MakeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { GetDeliverymanUseCase } from './get-deliveryman'

let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository
let getDeliverymanUseCase: GetDeliverymanUseCase

describe('Get deliveryman (e2e)', () => {
  beforeEach(() => {
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository()
    getDeliverymanUseCase = new GetDeliverymanUseCase(
      inMemoryDeliverymansRepository,
    )
  })

  it('should be able to get a deliveryman by id', async () => {
    const deliveryman = MakeDeliveryman({
      name: 'Gabriel',
      email: 'gabriel97gla98@gmail.com',
    })

    await inMemoryDeliverymansRepository.create(deliveryman)

    const result = await getDeliverymanUseCase.execute({
      deliverymanId: deliveryman.id.toString(),
    })

    expect(result.value).toBeTruthy()
    expect(result.value).toMatchObject({
      deliveryman: expect.objectContaining({
        name: 'Gabriel',
        email: 'gabriel97gla98@gmail.com',
      }),
    })
  })
})
