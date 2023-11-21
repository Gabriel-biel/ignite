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

describe('Fetch Orders Delvieryman (E2E)', () => {
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

  it('[Fetch] /orders/deliveryman', async () => {
    const deliveryman = await accountFactory.makePrismaAccount({
      role: 'DELIVERYMAN',
    })
    const accessToken = jwt.sign({ sub: deliveryman.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      name: 'Gabriel',
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    await orderFactory.makePrismaOrder({
      recipientId: recipient.id,
      addressId: address.id,
      deliverymanId: deliveryman.id,
    })
    await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })
    await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/deliveryman`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(1)
    expect(response.body).toEqual({
      orders: expect.arrayContaining([
        expect.objectContaining({
          recipientName: 'Gabriel',
        }),
      ]),
    })
  })
})
