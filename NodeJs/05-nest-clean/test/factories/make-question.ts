import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '@/domain/forum/enterprise/entities/Value-objects/Slug'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function MakeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const NewQuestion = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create('how-to-make'),
      ...override,
    },
    id,
  )

  return NewQuestion
}
