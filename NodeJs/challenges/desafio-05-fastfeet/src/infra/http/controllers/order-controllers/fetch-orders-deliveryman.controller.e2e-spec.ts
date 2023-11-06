import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Orders Delvieryman (E2E)', () => {
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

  it('[POST] /orders/deliveryman', async () => {
    const deliveryman = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabrielDeliveryman@gmail.com',
        cpf: '1111Deliveryman',
        role: 'DELIVERYMAN',
      },
    })
    const accessToken = jwt.sign({ sub: deliveryman.id })

    const recipient = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabrielRecipient@gmail.com',
        cpf: '2222Recipient',
        role: 'RECIPIENT',
      },
    })

    const address = await prisma.address.create({
      data: {
        city: 'Lábrea',
        houseNumber: '1756',
        latitude: '1234',
        longitude: '12345',
        street: 'Rua Luiz falcão',
        recipientId: deliveryman.id,
      },
    })

    await prisma.order.createMany({
      data: [
        {
          recipientId: recipient.id,
          addressId: address.id,
          deliverymanId: deliveryman.id,
        },
        {
          recipientId: recipient.id,
          addressId: address.id,
        },
        {
          recipientId: recipient.id,
          addressId: address.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/orders/deliveryman')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(1)
    expect(response.body).toEqual({
      orders: [expect.objectContaining({ deliverymanId: expect.any(String) })],
    })
  })
})
