import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { FetchOrdersAccountUseCase } from './fetch-orders-deliveryman'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let fetchOrdersAccount: FetchOrdersAccountUseCase

describe('Fetch orders by account', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersAccount = new FetchOrdersAccountUseCase(inMemoryOrderRepository)
  })

  it('should be able to fetch a list orders by account', async () => {
    await inMemoryOrderRepository.create(
      MakeOrder({ accountId: new UniqueEntityID('account-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ accountId: new UniqueEntityID('account-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ accountId: new UniqueEntityID('account-id') }),
    )

    const result = await fetchOrdersAccount.execute({
      page: 1,
      accountId: 'account-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(3)
  })
})
