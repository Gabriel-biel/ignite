import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachments: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question) {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachments.getItems())
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async delete(question: Question): Promise<void> {
    await this.prisma.question.delete({
      where: {
        id: question.id.toString(),
      },
    })
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    // essa Promise.all e usada aqui para melhorar a performace do código executando as operações em paralelo.
    await Promise.all([
      this.prisma.question.update({
        where: {
          id: data.id,
        },
        data,
      }),

      this.questionAttachments.createMany(question.attachments.getNewItems()),

      this.questionAttachments.deleteMany(
        question.attachments.getRemovedItems(),
      ),
    ])
  }
}
