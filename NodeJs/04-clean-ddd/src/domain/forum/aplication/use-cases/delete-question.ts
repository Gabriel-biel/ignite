import { QuestionsRepository } from '../repositories/questions-repository'

export interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Unauthorized action!')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
