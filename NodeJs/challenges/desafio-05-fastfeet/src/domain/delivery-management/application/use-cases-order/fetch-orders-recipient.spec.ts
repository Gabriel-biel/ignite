import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { FetchOrdersRecipientUseCase } from './fetch-orders-recipient'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let fetchOrdersRecipient: FetchOrdersRecipientUseCase

describe('Fetch orders by recipient', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersRecipient = new FetchOrdersRecipientUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders by recipient', async () => {
    await inMemoryOrderRepository.create(
      MakeOrder({ recipientId: new UniqueEntityID('recipient-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ recipientId: new UniqueEntityID('recipient-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ recipientId: new UniqueEntityID('recipient-id') }),
    )

    const result = await fetchOrdersRecipient.execute({
      page: 1,
      recipientId: 'recipient-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(3)
  })
})