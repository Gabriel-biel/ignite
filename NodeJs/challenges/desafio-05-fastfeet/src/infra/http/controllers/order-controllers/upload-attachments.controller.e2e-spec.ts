import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountFactory } from 'test/factories/make-account'

describe('Upload attachments e2e', () => {
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

  it('[POST] /attachments', async () => {
    const deliveryman = await accountFactory.makePrismaAccount({
      role: 'DELIVERYMAN',
    })
    const accessToken = jwt.sign({ sub: deliveryman.id.toString() })

    const result = await request(app.getHttpServer())
      .post(`/attachments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/sample-upload.jpeg')

    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual({
      attachmentId: expect.any(String),
    })
  })
})
