import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-coment'

export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract findById(answerCommentId: string): Promise<AnswerComment | null>
  abstract findManyAnswerCommentsById(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract delete(answerComment: AnswerComment): Promise<void>
}
