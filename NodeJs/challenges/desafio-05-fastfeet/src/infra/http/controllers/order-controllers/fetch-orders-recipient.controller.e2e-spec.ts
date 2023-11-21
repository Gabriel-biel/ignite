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

describe('Fetch Orders Recipients (E2E)', () => {
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

  it('[POST] /orders/recipient', async () => {
    const userAdm = await accountFactory.makePrismaAccount({
      role: 'ADM',
    })
    const accessToken = jwt.sign({ sub: userAdm.id.toString() })

    const user = await recipientFactory.makePrismaRecipient({
      name: 'Gabriel',
      role: 'RECIPIENT',
    })
    const user2 = await recipientFactory.makePrismaRecipient({
      name: 'mpvinnie',
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: user.id,
    })
    const address2 = await addressFactory.makePrismaAddress({
      recipientId: user2.id,
    })

    await orderFactory.makePrismaOrder({
      addressId: address.id,
      recipientId: user.id,
    })
    await orderFactory.makePrismaOrder({
      addressId: address2.id,
      recipientId: user2.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/recipient`)
      .query({ page: 1, recipientId: user2.id.toString() })
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(1)
    expect(response.body).toEqual({
      orders: expect.arrayContaining([
        expect.objectContaining({
          recipientId: user2.id.toString(),
          recipientName: 'mpvinnie',
        }),
      ]),
    })
  })
})
