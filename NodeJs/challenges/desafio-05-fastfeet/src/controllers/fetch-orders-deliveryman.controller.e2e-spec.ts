import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Orders Deliveryman (E2E)', () => {
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

  it('[POST] /deliveryman/orders', async () => {
    const adm = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabriel97@gmail.com',
        cpf: '12345',
        password: '23456',
        role: 'ADM',
      },
    })
    const accessToken = jwt.sign({ sub: adm.id })

    const recipient = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabrielRecipient@gmail.com',
        cpf: '1234567',
        role: 'RECIPIENT',
      },
    })

    await prisma.order.createMany({
      data: [
        {
          recipientId: recipient.id,
          pickupAvailableOrder: new Date(2023, 7, 22),
        },
        {
          recipientId: recipient.id,
          pickupAt: new Date(),
        },
        {
          recipientId: recipient.id,
          deliveredAt: new Date(),
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/deliveryman/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      orders: [
        expect.objectContaining({
          pickupAvailableOrder: '2023-08-22T04:00:00.000Z',
        }),
      ],
    })
  })
})
