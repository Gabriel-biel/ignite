import { Either, rigth } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { Injectable } from '@nestjs/common'
import { AnswerWithAuthor } from '../../enterprise/entities/Value-objects/answer-whit-author'

export interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswerUseCaseResponse = Either<
  null,
  {
    answers: AnswerWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionIdWithAuthor(
      questionId,
      {
        page,
      },
    )

    return rigth({
      answers,
    })
  }
}
