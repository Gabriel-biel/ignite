import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Delete account e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[DELETE] /account/profile', async () => {
    const accountAdm = await prisma.user.create({
      data: {
        name: 'Jhon Gabriel',
        email: 'jhonADMGabriel@gmail.com',
        cpf: '11111',
        password: '12345',
      },
    })
    const admToken = jwt.sign({ sub: accountAdm.id })

    const accountDeliveryman = await prisma.user.create({
      data: {
        name: 'Jhon Gabriel',
        email: 'jhonDeiverymanGabriel@gmail.com',
        cpf: '2222',
        password: '12345',
      },
    })

    const result = await request(app.getHttpServer())
      .delete('/account/profile')
      .query({ accountID: accountDeliveryman.id })
      .set('Authorization', `Bearer ${admToken}`)
      .send()

    expect(result.statusCode).toBe(200)
  })
})
