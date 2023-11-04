import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  it('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Jhon Gabriel',
      email: 'jhonGabriel@gmail.com',
      cpf: '123456',
      password: '12345',
    })

    expect(response.statusCode).toBe(201)
    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'jhonGabriel@gmail.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })

  it('[POST] /accounts for deliveryman', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Jhon Gabriel',
      email: 'jhonGabriel@gmail.com',
      cpf: '123456',
      password: '12345',
      role: 'DELIVERYMAN',
    })

    expect(response.statusCode).toBe(201)
    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'jhonGabriel@gmail.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})