import { AnswerComment } from '../../enterprise/entities/answer-coment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}
interface FetchAnswerCommentsResponse {
  answerComments: AnswerComment[]
}

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

    return {
      answerComments,
    }
  }
}
