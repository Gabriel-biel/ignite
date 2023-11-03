import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { DeleteOrderUseCase } from './delete-order'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let deleteOrderUseCase: DeleteOrderUseCase

describe('Delete order use case', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
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
