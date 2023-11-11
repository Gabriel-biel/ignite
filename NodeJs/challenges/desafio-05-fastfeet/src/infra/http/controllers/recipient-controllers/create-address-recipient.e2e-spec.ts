import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create address (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let accountFactory: AccountFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)
    accountFactory = moduleRef.get(AccountFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[POST] /recipients/addresses', async () => {
    const adm = await accountFactory.makePrismaAccount({
      role: 'ADM',
    })
    const accessToken = jwt.sign({ sub: adm.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const response = await request(app.getHttpServer())
      .post('/recipients/addresses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        city: 'Lábrea',
        street: 'Rua palmares',
        houseNumber: 'number-1',
        recipientId: recipient.id.toString(),
        latitude: 7.255565,
        longitude: 64.789486,
      })

    expect(response.statusCode).toEqual(201)
  })
})
