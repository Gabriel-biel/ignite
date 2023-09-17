import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Recent questions (E2E)', () => {
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
  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Gabriel',
        email: 'content@null',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          content: 'question 01',
          title: 'question 01',
          slug: 'question-01',
        },
        {
          authorId: user.id,
          content: 'question 02',
          title: 'question 02',
          slug: 'question-02',
        },
        {
          authorId: user.id,
          content: 'question 03',
          title: 'question 03',
          slug: 'question-03',
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'question 01' }),
        expect.objectContaining({ title: 'question 02' }),
        expect.objectContaining({ title: 'question 03' }),
      ],
    })
    console.log(response.body)
  })
})
