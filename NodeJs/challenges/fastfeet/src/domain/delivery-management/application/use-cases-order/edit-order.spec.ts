import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { EditOrderUseCase } from './edit-order'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let editOrderUseCase: EditOrderUseCase

describe('Edit order use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
    )
    editOrderUseCase = new EditOrderUseCase(
      inMemoryOrderRepository,
      inMemoryOrderAttachmentsRepository,
    )
  })

  it('should be able to edit a order', async () => {
    const recipient = MakeRecipient(
      {},
      new UniqueEntityID('recipient-id-for-test'),
    )
    const order = MakeOrder({ recipientId: recipient.id })

    await inMemoryRecipientRepository.create(recipient)
    await inMemoryOrderRepository.create(order)

    const result = await editOrderUseCase.execute({
      orderId: order.id.toString(),
      recipientId: recipient.id.toString(),
      pickupAvailableOrder: new Date(2023, 7, 22),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        pickup_available_order: new Date(2023, 7, 22),
      }),
    )
  })
})
