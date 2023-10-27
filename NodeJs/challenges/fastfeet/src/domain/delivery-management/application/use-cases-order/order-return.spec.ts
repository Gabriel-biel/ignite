import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { OrderReturnUseCase } from './order-return'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryAddressesRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let orderReturnUseCase: OrderReturnUseCase

describe('PickedUp order use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressesRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressesRepository,
    )
    orderReturnUseCase = new OrderReturnUseCase(inMemoryOrderRepository)
  })

  it('should be able to pickedup a order', async () => {
    const recipient = MakeRecipient(
      {},
      new UniqueEntityID('recipient-id-for-test'),
    )
    const order = MakeOrder({ recipientId: recipient.id })

    await inMemoryRecipientRepository.create(recipient)
    await inMemoryOrderRepository.create(order)

    const result = await orderReturnUseCase.execute({
      orderId: order.id.toString(),
      recipientId: recipient.id.toString(),
      returnAt: new Date(2023, 7, 22),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        returned_at: new Date(2023, 7, 22),
      }),
    )
  })
})
