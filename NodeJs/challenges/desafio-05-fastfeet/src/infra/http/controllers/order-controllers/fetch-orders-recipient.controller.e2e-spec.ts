import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Orders Recipients (E2E)', () => {
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

  it('[POST] /orders/recipient', async () => {
    const userAdm = await prisma.user.create({
      data: {
        name: 'Gabriel Lima',
        email: 'gabsAdm@gmail.com',
        cpf: '333333',
        role: 'ADM',
        password: '12345',
      },
    })
    const accessToken = jwt.sign({ sub: userAdm.id })

    await prisma.user.createMany({
      data: [
        {
          id: 'id-recipient-testing-1',
          name: 'Gabriel',
          email: 'gabrielRecipient1@gmail.com',
          cpf: '1111Recipient1',
          role: 'RECIPIENT',
        },
        {
          id: 'id-recipient-testing-2',
          name: 'Gabriel Andrade',
          email: 'gabrielRecipient2@gmail.com',
          cpf: '1111Recipient2',
          role: 'RECIPIENT',
        },
      ],
    })

    await prisma.address.createMany({
      data: [
        {
          id: 'id-address-testing-1',
          city: 'Lábrea',
          houseNumber: '1756',
          latitude: 11111,
          longitude: 22222,
          street: 'Rua Luiz falcão',
          recipientId: 'id-recipient-testing-1',
        },
        {
          id: 'id-address-testing-2',
          city: 'Lábrea',
          houseNumber: '1756',
          latitude: 33333,
          longitude: 444444,
          street: 'Rua Luiz',
          recipientId: 'id-recipient-testing-2',
        },
      ],
    })

    await prisma.order.createMany({
      data: [
        {
          recipientId: 'id-recipient-testing-1',
          addressId: 'id-address-testing-1',
        },
        {
          recipientId: 'id-recipient-testing-2',
          addressId: 'id-address-testing-2',
        },
        {
          recipientId: 'id-recipient-testing-2',
          addressId: 'id-address-testing-2',
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get(`/orders/recipient`)
      .query({ page: 1, recipientId: 'id-recipient-testing-1' })
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.orders).toHaveLength(1)
    expect(response.body).toEqual({
      orders: [expect.objectContaining({ recipientId: expect.any(String) })],
    })
  })
})
