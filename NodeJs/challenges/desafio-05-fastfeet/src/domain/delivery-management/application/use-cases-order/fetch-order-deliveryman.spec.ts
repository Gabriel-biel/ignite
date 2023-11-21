import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { FetchOrdersDeliverymanUseCase } from './fetch-orders-deliveryman'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeRecipient } from 'test/factories/make-recipient'
import { MakeAddress } from 'test/factories/make-address'

let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let fetchOrdersDeliverymanUseCase: FetchOrdersDeliverymanUseCase

describe('Fetch orders by account', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryRecipientRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersDeliverymanUseCase = new FetchOrdersDeliverymanUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders by account', async () => {
    const recipient = MakeRecipient()
    const address = MakeAddress()
    await inMemoryRecipientRepository.create(recipient)
    await inMemoryAddressRepository.create(address)

    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: recipient.id,
        deliverymanId: new UniqueEntityID('account-id'),
        addressId: address.id,
      }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: recipient.id,
        deliverymanId: new UniqueEntityID('account-id'),
        addressId: address.id,
      }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: recipient.id,
        deliverymanId: new UniqueEntityID('account-id'),
        addressId: address.id,
      }),
    )

    const result = await fetchOrdersDeliverymanUseCase.execute({
      page: 1,
      deliverymanId: 'account-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(3)
    expect(inMemoryOrderRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          deliverymanId: new UniqueEntityID('account-id'),
        }),
        expect.objectContaining({
          recipientId: recipient.id,
        }),
        expect.objectContaining({
          addressId: address.id,
        }),
      ]),
    )
  })
})
