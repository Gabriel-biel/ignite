import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Question } from '../../enterprise/entities/question'

export interface FetchRecentQuestionsRequest {
  page: number
}

export interface FetchRecentQuestionsResponse {
  questions: Question[]
}

export class FetchRecentQuestions {
  constructor(
    private inMemoryQuestionsRepository: InMemoryQuestionsRepository,
  ) {}

  async execute({
    page,
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.inMemoryQuestionsRepository.findManyRecent({
      page,
    })

    return {
      questions,
    }
  }
}
