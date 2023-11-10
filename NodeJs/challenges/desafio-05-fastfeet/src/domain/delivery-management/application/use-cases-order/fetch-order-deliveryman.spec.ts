import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'
import { FetchOrdersDeliverymanUseCase } from './fetch-orders-deliveryman'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let fetchOrdersDeliverymanUseCase: FetchOrdersDeliverymanUseCase

describe('Fetch orders by account', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersDeliverymanUseCase = new FetchOrdersDeliverymanUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders by account', async () => {
    await inMemoryOrderRepository.create(
      MakeOrder({ deliverymanId: new UniqueEntityID('account-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ deliverymanId: new UniqueEntityID('account-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ deliverymanId: new UniqueEntityID('account-id') }),
    )

    const result = await fetchOrdersDeliverymanUseCase.execute({
      page: 1,
      deliverymanId: 'account-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(3)
  })
})
