import { QuestionComment } from '../../enterprise/entities/question-coment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsRequest {
  questionId: string
  page: number
}
interface FetchQuestionCommentsResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyQuestionsCommentsById(
        questionId,
        { page },
      )

    return {
      questionComments,
    }
  }
}
