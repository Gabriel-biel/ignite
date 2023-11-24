import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { PickedUpOrderUseCase } from './picked-up-order'
import { MakeOrder } from 'test/factories/make-order'
import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { MakeAccount } from 'test/factories/make-account'
import { InMemoryAccountsRepository } from 'test/repositories/in-memory-account-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'

let inMemoryAccountRepository: InMemoryAccountsRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryAddressesRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryOrderRepository: InMemoryOrderRepository
let pickedUpOrderUseCase: PickedUpOrderUseCase

describe('PickedUp order use case', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountsRepository()
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryAddressesRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryRecipientRepository,
      inMemoryAddressesRepository,
    )
    pickedUpOrderUseCase = new PickedUpOrderUseCase(inMemoryOrderRepository)
  })

  it('should be able to pickedup a order', async () => {
    const account = MakeAccount({ role: 'DELIVERYMAN' })
    const order = MakeOrder()

    await inMemoryAccountRepository.create(account)
    await inMemoryOrderRepository.create(order)

    const result = await pickedUpOrderUseCase.execute({
      orderId: order.id.toString(),
      deliverymanId: account.id.toString(),
      pickupAt: new Date(2023, 7, 22),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(1)
    expect(inMemoryOrderRepository.items[0]).toEqual(
      expect.objectContaining({
        pickup_at: new Date(2023, 7, 22),
      }),
    )
  })
})
