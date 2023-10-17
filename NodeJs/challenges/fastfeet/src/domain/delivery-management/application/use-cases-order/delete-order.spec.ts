import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { DeleteOrderUseCase } from './delete-order'
import { MakeOrder } from 'test/factories/make-order'

let inMemoryOrderRepository: InMemoryOrderRepository
let deleteOrderUseCase: DeleteOrderUseCase

describe('Delete order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    deleteOrderUseCase = new DeleteOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to delete a order', async () => {
    const order = MakeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await deleteOrderUseCase.execute({
      orderId: order.id.toString(),
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(0)
  })
})
