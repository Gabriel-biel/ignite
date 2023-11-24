import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create accounts (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  it('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Jhon Gabriel',
      email: 'jhonADMGabriel@gmail.com',
      cpf: '11111',
      password: '12345',
    })

    expect(response.statusCode).toBe(201)
  })

  it('[POST] /accounts for deliveryman', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Jhon Gabriel',
      email: 'jhonDeliverymanGabriel@gmail.com',
      cpf: '2222',
      password: '12345',
      role: 'DELIVERYMAN',
    })

    expect(response.statusCode).toBe(201)
  })
})
