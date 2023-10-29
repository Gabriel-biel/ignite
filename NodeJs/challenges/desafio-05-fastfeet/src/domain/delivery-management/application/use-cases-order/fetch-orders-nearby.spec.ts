import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { FetchOrdersNearbyUseCase } from './fetch-orders-nearby'
import { MakeDeliveryman } from 'test/factories/make-deliveryman'
import { MakeRecipient } from 'test/factories/make-recipient'
import { InMemoryDeliverymansRepository } from 'test/repositories/in-memory-deliveryman-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeAddress } from 'test/factories/make-address'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryDeliverymansRepository: InMemoryDeliverymansRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let fetchOrdersNearbyUseCase: FetchOrdersNearbyUseCase

describe('Fetch orders nearby', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryDeliverymansRepository = new InMemoryDeliverymansRepository()
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
    const deliveryman = MakeDeliveryman()
    const recipient = MakeRecipient()

    const address = MakeAddress({
      recipientId: recipient.id,
      latitude: 7.268223,
      longitude: 64.795283,
    })

    const farAddress = MakeAddress({
      recipientId: new UniqueEntityID('recipient-id'),
    })

    await inMemoryDeliverymansRepository.create(deliveryman)
    await inMemoryRecipientRepository.create(recipient)
    await inMemoryAddressRepository.create(address)

    const order = MakeOrder({
      recipientId: recipient.id,
      addressId: address.id,
      pickup_at: new Date(),
      deliverymanId: deliveryman.id,
    })

    await inMemoryOrderRepository.create(order)

    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: recipient.id,
        addressId: address.id,
        delivered_at: new Date(),
        pickup_at: new Date(),
        deliverymanId: deliveryman.id,
      }),
    )

    await inMemoryOrderRepository.create(
      MakeOrder({
        recipientId: new UniqueEntityID('recipient-id'),
        addressId: farAddress.id,
      }),
    )

    const result = await fetchOrdersNearbyUseCase.execute({
      deliverymanId: deliveryman.id.toString(),
      deliverymanLatitude: 7.266545,
      deliverymanLongitude: 64.793686,
    })

    console.log(result.value)
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
