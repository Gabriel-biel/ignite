import { QuestionCommentsRepository } from '@/domain/forum/aplication/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-coment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
