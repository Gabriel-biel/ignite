import { InMemoryOrderAttachmentsRepository } from 'test/repositories/in-memory-order-attachments-repository'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { FetchOrdersDeliverymanUseCase } from './fetch-orders-deliveryman'
import { MakeOrder } from 'test/factories/make-order'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryAddressRepository: InMemoryAddressRepository
let inMemoryOrderAttachmentsRepository: InMemoryOrderAttachmentsRepository
let fetchOrdersDeliveryman: FetchOrdersDeliverymanUseCase

describe('Fetch orders by deliveryman', () => {
  beforeEach(() => {
    inMemoryOrderAttachmentsRepository =
      new InMemoryOrderAttachmentsRepository()
    inMemoryAddressRepository = new InMemoryAddressRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderAttachmentsRepository,
      inMemoryAddressRepository,
    )
    fetchOrdersDeliveryman = new FetchOrdersDeliverymanUseCase(
      inMemoryOrderRepository,
    )
  })

  it('should be able to fetch a list orders by deliveryman', async () => {
    await inMemoryOrderRepository.create(
      MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman-id') }),
    )
    await inMemoryOrderRepository.create(
      MakeOrder({ deliverymanId: new UniqueEntityID('deliveryman-id') }),
    )

    const result = await fetchOrdersDeliveryman.execute({
      page: 1,
      deliverymanId: 'deliveryman-id',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(3)
  })
})
