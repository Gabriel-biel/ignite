import { QuestionComment } from '../../enterprise/entities/question-coment'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
