import { AnswerWithAuthor } from '@/domain/forum/enterprise/entities/Value-objects/answer-whit-author'

export class AnswerWithAuthorPresenter {
  static toHttp(answerWithAuthor: AnswerWithAuthor) {
    return {
      authorId: answerWithAuthor.toString(),
      answerId: answerWithAuthor.answerId.toString(),
      authorName: answerWithAuthor.authorName,
      content: answerWithAuthor.content,
      cretedAt: answerWithAuthor.createdAt,
      updatedAt: answerWithAuthor.updatedAt,
    }
  }
}
