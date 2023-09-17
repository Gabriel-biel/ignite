import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create Account (E2E)', () => {
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
  test('[POST] /account', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Gabriel Lima',
      email: 'gabriel_gla98@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'gabriel_gla98@gmail.com',
      },
    })
    expect(userOnDatabase).toBeTruthy()
  })
})