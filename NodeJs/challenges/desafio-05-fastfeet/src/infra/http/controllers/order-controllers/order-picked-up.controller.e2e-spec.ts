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

describe('Order picked up e2e', () => {
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

  it('[PUT] /orders/pickedUp/:orderID/:deliverymanID', async () => {
    const deliveryman = await accountFactory.makePrismaAccount({
      role: 'DELIVERYMAN',
    })
    const admToken = jwt.sign({ sub: deliveryman.id.toString() })

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

    const result = await request(app.getHttpServer())
      .put(`/orders/pickedUp/${order.id.toString()}/${deliveryman.id}`)
      .set('Authorization', `Bearer ${admToken}`)
      .send()

    expect(result.statusCode).toBe(201)
  })
})
