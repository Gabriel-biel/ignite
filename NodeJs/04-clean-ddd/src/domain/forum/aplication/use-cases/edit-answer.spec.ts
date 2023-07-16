import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { MakeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer use case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer ', async () => {
    const NewAnswer = MakeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(NewAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'content example test',
    })

    expect(inMemoryAnswersRepository.items[0]).toEqual(
      expect.objectContaining({ content: 'content example test' }),
    )
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'content example test',
    })
  })
  it('should not be able to edit a answer from another user', async () => {
    const NewAnswer = MakeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(NewAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
        content: '',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
