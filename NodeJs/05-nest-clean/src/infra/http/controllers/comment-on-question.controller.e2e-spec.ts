import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { InstructorFactory } from 'test/factories/make-instructor'
import { QuestionFactory } from 'test/factories/make-question'

describe('Comment on question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let questionFactory: QuestionFactory
  let instructorFactory: InstructorFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [InstructorFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    instructorFactory = moduleRef.get(InstructorFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[PUT] /questions/:questionId/comments', async () => {
    const user = await instructorFactory.makePrismaInstructor()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'new comment',
      })

    expect(response.statusCode).toBe(201)
    const commentOnDatabase = await prisma.comment.findFirst({
      where: {
        content: 'new comment',
      },
    })

    expect(commentOnDatabase).toBeTruthy()
  })
})
