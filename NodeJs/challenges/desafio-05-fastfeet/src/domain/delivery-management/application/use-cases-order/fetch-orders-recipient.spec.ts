import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { FetchOrdersRecipientUseCase } from './fetch-orders-recipient'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { MakeAddress } from 'test/factories/make-address'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'

let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let fetchOrdersRecipient: FetchOrdersRecipientUseCase

describe('Fetch orders by recipient', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryRecipientRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersRecipient = new FetchOrdersRecipientUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders by recipient', async () => {
    const recipient = MakeRecipient()
    const address = MakeAddress()
    await inMemoryAddressRepository.create(address)
    await inMemoryRecipientRepository.create(recipient)

    await inMemoryOrderRepository.create(
      MakeOrder({ recipientId: recipient.id, addressId: address.id }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ recipientId: recipient.id, addressId: address.id }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ recipientId: recipient.id, addressId: address.id }),
    )

    const result = await fetchOrdersRecipient.execute({
      page: 1,
      recipientId: recipient.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(3)
    expect(inMemoryOrderRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: recipient.id,
          addressId: address.id,
        }),
        expect.objectContaining({
          recipientId: recipient.id,
          addressId: address.id,
        }),
        expect.objectContaining({
          recipientId: recipient.id,
          addressId: address.id,
        }),
      ]),
    )
  })
})
