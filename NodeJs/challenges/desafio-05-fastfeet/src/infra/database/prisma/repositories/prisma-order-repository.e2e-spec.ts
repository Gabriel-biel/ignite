import { OrderRepository } from '@/domain/delivery-management/application/repositories/order-repository'
import { AppModule } from '@/infra/app.module'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AddressFactory } from 'test/factories/make-address'
import { OrderFactory } from 'test/factories/make-order'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Prisma orders repository', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let addressFactory: AddressFactory
  let orderFactory: OrderFactory
  let orderRepository: OrderRepository
  let cacheRepository: CacheRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [RecipientFactory, AddressFactory, OrderFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)
    addressFactory = moduleRef.get(AddressFactory)
    orderFactory = moduleRef.get(OrderFactory)
    orderRepository = moduleRef.get(OrderRepository)
    cacheRepository = moduleRef.get(CacheRepository)

    await app.init()
  })

  it('should cache order details ', async () => {
    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    const order = await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })

    const orderDetails = await orderRepository.findByDetailsByOrderId(
      order.id.toString(),
    )

    const cached = await cacheRepository.get(
      `order:${order.id.toString()}:details`,
    )

    expect(cached).toEqual(JSON.stringify(orderDetails))
  })

  it('should return cached order details on subsequent calls', async () => {
    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    const order = await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })

    await cacheRepository.set(
      `order:${order.id.toString()}:details`,
      JSON.stringify({ empty: true }),
    )

    const orderDetails = await orderRepository.findByDetailsByOrderId(
      order.id.toString(),
    )

    expect(orderDetails).toEqual({ empty: true })
  })

  it('should reset order details cached when saving the order  ', async () => {
    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    const order = await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })

    await cacheRepository.set(
      `order:${order.id.toString()}:details`,
      JSON.stringify({ empty: true }),
    )

    await orderRepository.save(order)

    const cached = await cacheRepository.get(
      `order:${order.id.toString()}:details`,
    )

    expect(cached).toBeNull()
  })
})
