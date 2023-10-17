import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { EditOrderUseCase } from './edit-order'
import { MakeOrder } from 'test/factories/make-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let editOrderUseCase: EditOrderUseCase

describe('Edit order', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    editOrderUseCase = new EditOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to edit a order', async () => {
    const order = MakeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await editOrderUseCase.execute({
      orderId: order.id.toString(),
      orderAvailable: new Date(2023, 7, 22),
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        order_available: new Date(2023, 7, 22),
      }),
    )
  })
})
