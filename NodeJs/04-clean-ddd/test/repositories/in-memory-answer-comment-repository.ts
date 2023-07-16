import { AnswerCommentsRepository } from '@/domain/forum/aplication/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-coment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []
  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
