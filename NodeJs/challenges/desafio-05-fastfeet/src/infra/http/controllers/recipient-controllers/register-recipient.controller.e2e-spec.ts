import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create recipient (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[POST] /recipients', async () => {
    const adm = await recipientFactory.makePrismaRecipient({
      role: 'ADM',
    })
    const accessToken = jwt.sign({ sub: adm.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/recipients')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Gabriel',
        email: 'gabrielRecipient@gmail.com',
        cpf: '1234567',
      })

    expect(response.statusCode).toBe(201)
  })
})
