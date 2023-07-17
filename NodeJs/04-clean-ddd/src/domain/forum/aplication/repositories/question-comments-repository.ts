import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-coment'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment>
  findManyQuestionsCommentsById(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>
}
