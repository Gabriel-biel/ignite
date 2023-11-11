import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'

describe('PATCH account e2e', () => {
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

  it('[PATCH] /account/profile', async () => {
    const deliverymanAccount = await accountFactory.makePrismaAccount()
    const deliverymanToken = jwt.sign({ sub: deliverymanAccount.id.toString() })

    const result = await request(app.getHttpServer())
      .get('/account/profile')
      .set('Authorization', `Bearer ${deliverymanToken}`)
      .send({
        name: 'Gabriel deliveryman',
        email: 'gabrieldeliveryman@gmail.com',
        password: '2222',
      })

    expect(result.statusCode).toBe(200)
  })
})
