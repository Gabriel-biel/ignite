import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaStudentRepository } from './prisma/repositories/prisma-student-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-questions-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answers-comments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answers-attachments-respository'

import { StudentRepository } from '@/domain/forum/aplication/repositories/student-repository'
import { QuestionsRepository } from '@/domain/forum/aplication/repositories/questions-repository'
import { AnswersRepository } from '@/domain/forum/aplication/repositories/answers-repository'
import { QuestionCommentsRepository } from '@/domain/forum/aplication/repositories/question-comments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/aplication/repositories/answer-comments-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/aplication/repositories/answer-attachments-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/aplication/repositories/question-attachments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
