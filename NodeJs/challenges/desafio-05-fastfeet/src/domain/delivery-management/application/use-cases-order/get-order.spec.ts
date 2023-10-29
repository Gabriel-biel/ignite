import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { GetOrderUseCase } from './get-order'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let getOrderUseCase: GetOrderUseCase

describe('Get order use case', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    getOrderUseCase = new GetOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to get a order by id', async () => {
    const order = MakeOrder({ delivered_at: new Date(2023, 7, 22) })

    await inMemoryOrderRepository.create(order)

    const result = await getOrderUseCase.execute({
      orderId: order.id.toString(),
      recipientId: order.recipientId.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      order: expect.objectContaining({
        delivered_at: new Date(2023, 7, 22),
      }),
    })
  })
})
