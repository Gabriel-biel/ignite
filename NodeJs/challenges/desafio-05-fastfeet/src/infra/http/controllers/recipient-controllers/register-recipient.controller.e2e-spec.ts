import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'

describe('Create recipient (E2E)', () => {
  let app: INestApplication
  let accountFactory: AccountFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[POST] /recipients', async () => {
    const adm = await accountFactory.makePrismaAccount({
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
