import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { GetOrderUseCase } from './get-order'
import { MakeOrder } from 'test/factories/make-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let getOrderUseCase: GetOrderUseCase

describe('Get order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    getOrderUseCase = new GetOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to get a order by id', async () => {
    const order = MakeOrder({ delivered_at: new Date(2023, 7, 22) })

    await inMemoryOrderRepository.create(order)

    const result = await getOrderUseCase.execute({
      orderId: order.id.toString(),
    })

    expect(result.isRigth()).toBeTruthy()
    expect(result.value).toMatchObject({
      order: expect.objectContaining({
        delivered_at: new Date(2023, 7, 22),
      }),
    })
  })
})
