import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Orders nearby deliveryman (E2E)', () => {
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

  it('[Fetch] /orders/nearby', async () => {
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
    const recipient3km = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabrielRecipient3km@gmail.com',
        cpf: '3kmRecipient',
        role: 'RECIPIENT',
      },
    })

    const address = await prisma.address.create({
      data: {
        city: 'Lábrea',
        houseNumber: '1578',
        latitude: -7.268277,
        longitude: -64.795224,
        street: 'Rua Luiz',
        recipientId: recipient.id,
      },
    })

    const address3km = await prisma.address.create({
      data: {
        city: 'Lábrea',
        houseNumber: 'km3',
        latitude: -7.285418,
        longitude: -64.773119,
        street: 'Rua aeroporto',
        recipientId: recipient3km.id,
      },
    })

    await prisma.order.createMany({
      data: [
        {
          recipientId: recipient.id,
          addressId: address.id,
          deliverymanId: deliveryman.id,
          pickupAvailableOrder: new Date(),
        },
        {
          recipientId: recipient3km.id,
          addressId: address3km.id,
          deliverymanId: deliveryman.id,
          pickupAvailableOrder: new Date(),
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/nearby`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        // address 3km
        // latitude: -7.285418,
        // longitude: -64.773119,
        // address 300 mt
        latitude: -7.270107382622646,
        longitude: -64.79704665743586,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(1)
    expect(response.body).toEqual({
      orders: [expect.objectContaining({ deliverymanId: deliveryman.id })],
    })
  })
})
