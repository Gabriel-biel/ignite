import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/aplication/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-coment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<QuestionComment> {
    throw new Error('Method not implemented.')
  }

  findManyQuestionsCommentsById(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }

  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}