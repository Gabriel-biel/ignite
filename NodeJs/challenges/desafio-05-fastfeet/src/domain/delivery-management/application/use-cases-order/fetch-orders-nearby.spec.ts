import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { FetchOrdersNearbyUseCase } from './fetch-orders-nearby'
import { MakeAccount } from 'test/factories/make-account'
import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeAddress } from 'test/factories/make-address'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryAccountsRepository: InMemoryAccountsRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let fetchOrdersNearbyUseCase: FetchOrdersNearbyUseCase

describe('Fetch orders nearby', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersNearbyUseCase = new FetchOrdersNearbyUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders nearby', async () => {
    const account = MakeAccount()
    const recipient = MakeRecipient()

    const address = MakeAddress({
      recipientId: recipient.id,
      latitude: 7.268223,
      longitude: 64.795283,
    })

    const farAddress = MakeAddress({
      recipientId: new UniqueEntityID('recipient-id'),
    })

    await inMemoryAccountsRepository.create(account)
    await inMemoryRecipientRepository.create(recipient)
    await inMemoryAddressRepository.create(address)

    const order = MakeOrder({
      recipientId: recipient.id,
      addressId: address.id,
      pickup_at: new Date(),
      deliverymanId: account.id,
    })

    await inMemoryOrderRepository.create(order)

    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: recipient.id,
        addressId: address.id,
        delivered_at: new Date(),
        pickup_at: new Date(),
        deliverymanId: account.id,
      }),
    )

    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: new UniqueEntityID('recipient-id'),
        addressId: farAddress.id,
      }),
    )

    const result = await fetchOrdersNearbyUseCase.execute({
      deliverymanId: account.id.toString(),
      accountLatitude: 7.266545,
      accountLongitude: 64.793686,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(
      expect.objectContaining({
        orders: expect.arrayContaining([
          expect.objectContaining({
            id: order.id,
          }),
        ]),
      }),
    )
  })
})
