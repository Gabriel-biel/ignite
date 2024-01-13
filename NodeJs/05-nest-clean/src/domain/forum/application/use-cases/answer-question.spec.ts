import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { InMemoryInstructorsRepository } from 'test/repositories/in-memory-instructors-repository'

let inMemoryInstructorRepository: InMemoryInstructorsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // system under test

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryInstructorRepository = new InMemoryInstructorsRepository()
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
      inMemoryInstructorRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to answer question', async () => {
    const question = MakeQuestion()
    const result = await sut.execute({
      authorId: '1',
      questionId: question.id.toString(),
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]).toEqual(
      expect.objectContaining({ content: 'Conteúdo da resposta' }),
    )

    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
      ],
    )
  })

  it('should persist attachments when creating a new answer', async () => {
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'Esse e o content para tests',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryAnswerAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})