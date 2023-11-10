import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Get order e2e', () => {
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

  it('[GET] /orders', async () => {
    const accountAdm = await prisma.user.create({
      data: {
        name: 'Jhon Gabriel',
        email: 'jhonADMGabriel@gmail.com',
        cpf: '11111',
        password: '12345',
      },
    })
    const admToken = jwt.sign({ sub: accountAdm.id })

    const recipient = await prisma.user.create({
      data: {
        name: 'Jhon Gabriel',
        email: 'jhonRecipientGabriel@gmail.com',
        cpf: '2222',
        password: '12345',
      },
    })

    const address = await prisma.address.create({
      data: {
        city: 'Lábrea',
        street: 'Rua palmares',
        houseNumber: '123',
        recipientId: recipient.id,
        latitude: 765.4,
        longitude: 765.4,
      },
    })

    const order = await prisma.order.create({
      data: {
        addressId: address.id,
        recipientId: recipient.id,
      },
    })

    const result = await request(app.getHttpServer())
      .get(`/orders/${order.id}/${recipient.id}`)
      .set('Authorization', `Bearer ${admToken}`)
      .send()

    expect(result.statusCode).toBe(200)
  })
})
