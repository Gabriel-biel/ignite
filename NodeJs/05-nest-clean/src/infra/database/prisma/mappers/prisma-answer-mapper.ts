import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        authorId: new UniqueEntityID(raw.id),
        created_at: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(Answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: Answer.id.toString(),
      authorId: Answer.authorId.toString(),
      questionId: Answer.questionId.toString(),
      content: Answer.content,
    }
  }
}
