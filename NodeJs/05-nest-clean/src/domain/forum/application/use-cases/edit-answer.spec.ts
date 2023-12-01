import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { MakeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { MakeAnswerAttachments } from 'test/factories/make-answer-attachment'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer use case', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswersAttachmentsRepository,
      inMemoryAnswersRepository,
    )
  })
  it('should be able to edit a answer ', async () => {
    const NewAnswer = MakeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(NewAnswer)

    inMemoryAnswersAttachmentsRepository.items.push(
      MakeAnswerAttachments({
        answerId: NewAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      MakeAnswerAttachments({
        answerId: NewAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      attachmentsIds: ['1', '2'],
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

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
      content: '',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
