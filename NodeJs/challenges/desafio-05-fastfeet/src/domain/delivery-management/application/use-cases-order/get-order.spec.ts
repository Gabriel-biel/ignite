import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { GetOrderUseCase } from './get-order'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { MakeAddress } from 'test/factories/make-address'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let getOrderUseCase: GetOrderUseCase

describe('Get order use case', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryRecipientRepository,
      inMemoryAddressRepository,
    )
    getOrderUseCase = new GetOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to get a order by id', async () => {
    const recipient = MakeRecipient()
    const address = MakeAddress()
    const order = MakeOrder({
      addressId: address.id,
      recipientId: recipient.id,
      delivered_at: new Date(2023, 7, 22),
    })

    await inMemoryAddressRepository.create(address)
    await inMemoryRecipientRepository.create(recipient)
    await inMemoryOrderRepository.create(order)

    const result = await getOrderUseCase.execute({
      orderId: order.id.toString(),
      recipientId: recipient.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: recipient.id,
        addressId: address.id,
      }),
    )
    expect(result.value).toMatchObject({
      order: expect.objectContaining({
        recipientName: recipient.name,
      }),
    })
  })
})
