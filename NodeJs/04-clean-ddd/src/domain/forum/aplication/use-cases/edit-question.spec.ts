import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { MakeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question use case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question ', async () => {
    const NewQuestion = MakeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(NewQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'ok title test',
      content: 'content example test',
    })

    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      expect.objectContaining({ title: 'ok title test' }),
    )
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'ok title test',
      content: 'content example test',
    })
  })
  it('should not be able to edit a question from another user', async () => {
    const NewQuestion = MakeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(NewQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
        title: '',
        content: '',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
