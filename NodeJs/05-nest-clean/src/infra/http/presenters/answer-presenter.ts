import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswersPresenter {
  static toHttp(answer: Answer) {
    return {
      id: answer.id.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      cretedAt: answer.created_at,
      updatedAt: answer.updated_at,
    }
  }
}
