import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Choose recipient name(E2E)', () => {
  let app: INestApplication
  let accountFactory: AccountFactory
  let recipientFactory: RecipientFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[PUT] /recipient/profile/newName/:recipientId', async () => {
    const adm = await accountFactory.makePrismaAccount({
      role: 'ADM',
    })
    const accessToken = jwt.sign({ sub: adm.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      role: 'RECIPIENT',
    })

    const response = await request(app.getHttpServer())
      .put(`/recipient/profile/newName/${recipient.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Gabriel Recipient',
      })

    expect(response.statusCode).toBe(200)
  })
})
