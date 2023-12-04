import { QuestionDetails } from '@/domain/forum/enterprise/entities/Value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionsDetailsPresenter {
  static toHttp(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      authorName: questionDetails.authorName,
      slug: questionDetails.slug.value,
      title: questionDetails.title,
      content: questionDetails.content,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHttp),
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      cretedAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
