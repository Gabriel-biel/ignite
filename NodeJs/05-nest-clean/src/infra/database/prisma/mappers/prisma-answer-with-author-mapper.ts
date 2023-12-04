import { Answer as PrismaAnswer, User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerWithAuthor } from '@/domain/forum/enterprise/entities/Value-objects/answer-whit-author'

type PrismaAnswerWithAuthor = PrismaAnswer & {
  author: PrismaUser
}

export class PrismaAnswerWithAuthorMapper {
  static toDomain(raw: PrismaAnswerWithAuthor): AnswerWithAuthor {
    return AnswerWithAuthor.create({
      authorId: new UniqueEntityID(raw.authorId),
      answerId: new UniqueEntityID(raw.id),
      authorName: raw.author.name,
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
