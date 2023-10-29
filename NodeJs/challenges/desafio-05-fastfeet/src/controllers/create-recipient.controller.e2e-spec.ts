import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create recipient (E2E)', () => {
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

  it('[POST] /accounts/recipients', async () => {
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

    const response = await request(app.getHttpServer())
      .post('/accounts/recipients')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Gabriel',
        email: 'gabrielRecipient@gmail.com',
        cpf: '1234567',
        role: 'RECIPIENT',
      })

    expect(response.statusCode).toBe(201)
    const recipientOnDatabase = await prisma.user.findFirst({
      where: {
        email: 'gabrielRecipient@gmail.com',
      },
    })
    expect(recipientOnDatabase).toBeTruthy()
  })
})
