import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { DeleteOrderUseCase } from './delete-order'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let deleteOrderUseCase: DeleteOrderUseCase

describe('Delete order use case', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
    )
    deleteOrderUseCase = new DeleteOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to delete a order', async () => {
    const order = MakeOrder()

    await inMemoryOrderRepository.create(order)

    const result = await deleteOrderUseCase.execute({
      orderId: order.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(0)
  })
})
