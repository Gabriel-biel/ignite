import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionCommentsFactory } from 'test/factories/make-question-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch question comments (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let questionCommentsFactory: QuestionCommentsFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentsFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentsFactory = moduleRef.get(QuestionCommentsFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[GET] /questions', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Jhon doe',
    })
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: 'question-01',
    })

    await Promise.all([
      questionCommentsFactory.makePrismaQuestionComment({
        content: 'comment 01',
        authorId: user.id,
        questionId: question.id,
      }),
      questionCommentsFactory.makePrismaQuestionComment({
        content: 'comment 02',
        authorId: user.id,
        questionId: question.id,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${question.id.toString()}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: 'comment 01',
          authorName: 'Jhon doe',
        }),
        expect.objectContaining({
          content: 'comment 02',
          authorName: 'Jhon doe',
        }),
      ]),
    })
  })
})
