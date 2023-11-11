import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let accountFactory: AccountFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    accountFactory = moduleRef.get(AccountFactory)

    await app.init()
  })

  it('[POST] /sessions', async () => {
    await accountFactory.makePrismaAccount({
      cpf: '1234',
      password: await hash('12345', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: '1234',
      password: '12345',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
