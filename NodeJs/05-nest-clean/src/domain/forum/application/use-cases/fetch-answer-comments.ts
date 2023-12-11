import { Either, rigth } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/Value-objects/comment-with-author'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}
type FetchAnswerCommentsResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const comments =
      await this.answerCommentsRepository.findManyAnswerCommentsByIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return rigth({
      comments,
    })
  }
}
