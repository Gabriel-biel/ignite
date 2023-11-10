import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create address (E2E)', () => {
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

  it('[POST] /recipients/addresses', async () => {
    const adm = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabriel97@gmail.com',
        cpf: '12345',
        password: '23456',
      },
    })

    const accessToken = jwt.sign({ sub: adm.id })

    const recipient = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'gabrielRecipient@gmail.com',
        cpf: '1111',
        password: '23456',
      },
    })

    const response = await request(app.getHttpServer())
      .post('/recipients/addresses')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        city: 'Lábrea',
        street: 'Rua palmares',
        houseNumber: 'number-1',
        recipientId: recipient.id,
        latitude: 7.255565,
        longitude: 64.789486,
      })

    expect(response.statusCode).toEqual(201)
    const addressOnDatabase = await prisma.address.findFirst({
      where: {
        city: 'Lábrea',
      },
    })
    expect(addressOnDatabase).toBeTruthy()
  })
})
