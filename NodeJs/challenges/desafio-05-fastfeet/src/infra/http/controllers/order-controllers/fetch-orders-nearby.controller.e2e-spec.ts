import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { AddressFactory } from 'test/factories/make-address'
import { OrderFactory } from 'test/factories/make-order'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Fetch Orders nearby deliveryman (E2E)', () => {
  let app: INestApplication
  let accountFactory: AccountFactory
  let recipientFactory: RecipientFactory
  let addressFactory: AddressFactory
  let orderFactory: OrderFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AccountFactory,
        RecipientFactory,
        AddressFactory,
        OrderFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    addressFactory = moduleRef.get(AddressFactory)
    orderFactory = moduleRef.get(OrderFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[Fetch] /orders/nearby', async () => {
    const deliveryman = await accountFactory.makePrismaAccount({
      role: 'DELIVERYMAN',
    })
    const accessToken = jwt.sign({ sub: deliveryman.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      latitude: -7.268277,
      longitude: -64.795224,
      recipientId: recipient.id,
    })

    await orderFactory.makePrismaOrder({
      recipientId: recipient.id,
      addressId: address.id,
      deliverymanId: deliveryman.id,
      pickup_available_order: new Date(),
    })

    await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })

    const recipient3km = await recipientFactory.makePrismaRecipient({
      cpf: '3kmRecipient',
      role: 'RECIPIENT',
    })

    const address3km = await addressFactory.makePrismaAddress({
      latitude: -7.285418,
      longitude: -64.773119,
      recipientId: recipient3km.id,
    })

    await orderFactory.makePrismaOrder({
      recipientId: recipient3km.id,
      addressId: address3km.id,
      deliverymanId: deliveryman.id,
      pickup_available_order: new Date(),
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/nearby`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        // address 3km
        // latitude: -7.285418,
        // longitude: -64.773119,
        // address 300 mt
        latitude: -7.270107382622646,
        longitude: -64.79704665743586,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(1)
    expect(response.body).toEqual({
      orders: [
        expect.objectContaining({ deliverymanId: deliveryman.id.toString() }),
      ],
    })
  })
})
