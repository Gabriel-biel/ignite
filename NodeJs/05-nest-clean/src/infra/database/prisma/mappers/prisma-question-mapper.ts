import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/forum/enterprise/entities/Value-objects/Slug'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.id),
        bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.id) : null,
        slug: Slug.create(raw.slug),
        created_at: raw.createdAt,
        updated_at: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
