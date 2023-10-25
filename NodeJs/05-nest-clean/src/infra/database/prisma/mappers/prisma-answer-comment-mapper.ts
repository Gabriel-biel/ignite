import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-coment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        answerId: new UniqueEntityID(raw.answerId),
        created_at: raw.createdAt,
        updated_at: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    AnswerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: AnswerComment.id.toString(),
      authorId: AnswerComment.authorId.toString(),
      answerId: AnswerComment.answerId.toString(),
      content: AnswerComment.content,
    }
  }
}
