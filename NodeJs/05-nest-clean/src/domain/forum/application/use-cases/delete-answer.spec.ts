import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { MakeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { MakeAnswerAttachments } from 'test/factories/make-answer-attachment'
import { InMemoryInstructorsRepository } from 'test/repositories/in-memory-instructors-repository'

let inMemoryInstructorRepository: InMemoryInstructorsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer use case', () => {
  beforeEach(() => {
    inMemoryInstructorRepository = new InMemoryInstructorsRepository()
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
      inMemoryInstructorRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer ', async () => {
    const NewAnswer = MakeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(NewAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
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
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answer from another user', async () => {
    const NewAnswer = MakeAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(NewAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})