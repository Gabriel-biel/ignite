import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { AddressFactory } from 'test/factories/make-address'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create order (E2E)', () => {
  let app: INestApplication
  let accountFactory: AccountFactory
  let recipientFactory: RecipientFactory
  let addressFactory: AddressFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory, AddressFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    addressFactory = moduleRef.get(AddressFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[POST] /orders', async () => {
    const adm = await accountFactory.makePrismaAccount({
      role: 'ADM',
    })
    const accessToken = jwt.sign({ sub: adm.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const address = await addressFactory.makePrismaAddress({
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer())
      .post('/orders')
      .query({ recipientId: recipient.id.toString() })
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        recipientId: recipient.id.toString(),
        addressId: address.id.toString(),
      })

    expect(response.statusCode).toBe(201)
  })
})
