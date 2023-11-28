import { Either, rigth } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-coment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Injectable } from '@nestjs/common'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}
type FetchAnswerCommentsResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyAnswerCommentsById(answerId, {
        page,
      })

    return rigth({
      answerComments,
    })
  }
}
