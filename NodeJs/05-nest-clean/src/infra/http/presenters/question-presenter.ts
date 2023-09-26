import { Question } from '@/domain/forum/enterprise/entities/question'

export class QuestionsPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      cretedAt: question.created_at,
      updatedAt: question.updated_at,
    }
  }
}
