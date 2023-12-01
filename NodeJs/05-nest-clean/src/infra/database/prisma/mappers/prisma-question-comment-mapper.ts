import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-coment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionComment.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        questionId: new UniqueEntityID(raw.questionId),
        content: raw.content,
        created_at: raw.createdAt,
        updated_at: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    QuestionComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: QuestionComment.id.toString(),
      authorId: QuestionComment.authorId.toString(),
      questionId: QuestionComment.questionId.toString(),
      content: QuestionComment.content,
    }
  }
}
