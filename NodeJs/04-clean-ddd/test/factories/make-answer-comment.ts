import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentsProps,
} from '@/domain/forum/enterprise/entities/answer-coment'
import { faker } from '@faker-js/faker'

export function MakeAnswerComment(
  override: Partial<AnswerCommentsProps> = {},
  id?: UniqueEntityID,
) {
  const NewAnswerComment = AnswerComment.create({
    answerId: new UniqueEntityID(),
    authorId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override,
  })

  return NewAnswerComment
}
