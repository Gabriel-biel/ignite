import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { MakeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { MakeQuestionAttachments } from 'test/factories/make-question-attachments'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit question use case', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsAttachmentsRepository,
    )
  })
  it('should be able to edit a question ', async () => {
    const NewQuestion = MakeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(NewQuestion)

    inMemoryQuestionsAttachmentsRepository.items.push(
      MakeQuestionAttachments({
        questionId: NewQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      MakeQuestionAttachments({
        questionId: NewQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'ok title test',
      content: 'content example test',
      attachmentsIds: ['1', '3'],
    })

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })
  it('should not be able to edit a question from another user', async () => {
    const NewQuestion = MakeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(NewQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: '',
      content: '',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
