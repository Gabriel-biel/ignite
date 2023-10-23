import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { FetchOrdersNearbyUseCase } from './fetch-orders-nearby'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MakeRecipient } from 'test/factories/make-recipient'

let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let fetchOrdersNearbyUseCase: FetchOrdersNearbyUseCase

describe('Fetch orders nearby', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository(
      inMemoryAddressRepository,
    )
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersNearbyUseCase = new FetchOrdersNearbyUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders nearby', async () => {
    // await inMemoryOrderRepository.create(
    //   MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman-id') }),
    // )
    // await inMemoryOrderRepository.create(
    //   MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman-id') }),
    // )
    // await inMemoryOrderRepository.create(
    //   MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman') }),
    // )
    // for (let i = 1; i++; i < 3) {
    //   await inMemoryOrderRepository.create(
    //     MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman-id') }),
    //   )
    // }
    // await inMemoryRecipientRepository.create(
    //   MakeRecipient(
    //     {
    //       address: {
    //         city: 'Lábrea',
    //         street: 'Rua 1',
    //         house_number: 123,
    //         latitude: 7.268235,
    //         longitude: 64.795282,
    //       },
    //     },
    //     new UniqueEntityID('deliveryman-id'),
    //   ),
    // )
    // const result = await fetchOrdersNearbyUseCase.execute({})
    // expect(result.isRigth()).toBeTruthy()
    // expect(inMemoryOrderRepository.items).toHaveLength(3)
  })
})
