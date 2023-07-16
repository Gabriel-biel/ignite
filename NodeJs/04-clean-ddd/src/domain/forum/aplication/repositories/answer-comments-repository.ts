import { AnswerComment } from '../../enterprise/entities/answer-coment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
