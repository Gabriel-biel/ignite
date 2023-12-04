import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-coment'
import { CommentWithAuthor } from '../../enterprise/entities/Value-objects/comment-with-author'

export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract findById(answerCommentId: string): Promise<AnswerComment | null>
  abstract findManyAnswerCommentsById(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract findManyAnswerCommentsByIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract delete(answerComment: AnswerComment): Promise<void>
}
