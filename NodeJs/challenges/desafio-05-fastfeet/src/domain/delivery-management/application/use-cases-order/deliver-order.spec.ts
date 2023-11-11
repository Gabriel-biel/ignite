import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { DeliverOrderUseCase } from './deliver-order'
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
let deliverOrderUseCase: DeliverOrderUseCase

describe('Deliver order use case', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressesRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressesRepository,
    )
    deliverOrderUseCase = new DeliverOrderUseCase(
      inMemoryOrderRepository,
      inMemoryOrderAttachmentsRepository,
    )
  })

  it('should be able to deliver a order', async () => {
    const recipient = MakeRecipient(
      {},
      new UniqueEntityID('recipient-id-for-test'),
    )
    const order = MakeOrder({ recipientId: recipient.id })

    await inMemoryRecipientRepository.create(recipient)
    await inMemoryOrderRepository.create(order)

    const result = await deliverOrderUseCase.execute({
      orderId: order.id.toString(),
      recipientId: recipient.id.toString(),
      deliveredAt: new Date(2023, 7, 22),
      attachmentsIds: ['attachment-id-1', 'attachment-id-2'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        delivered_at: new Date(2023, 7, 22),
      }),
    )
  })
})
