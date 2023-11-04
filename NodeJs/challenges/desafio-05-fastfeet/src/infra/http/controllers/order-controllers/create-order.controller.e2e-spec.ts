import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create order (E2E)', () => {
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

  it('[POST] /orders', async () => {
    const recipient = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabriel97@gmail.com',
        cpf: '1234567',
        role: 'RECIPIENT',
      },
    })

    const accessToken = jwt.sign({ sub: recipient.id })

    const response = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        recipientId: recipient.id,
        addressId: 'address-id',
      })

    expect(response.statusCode).toBe(201)
    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        recipientId: recipient.id,
        addressId: 'address-id',
      },
    })
    expect(orderOnDatabase).toBeTruthy()
  })
})
