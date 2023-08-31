import { MakeAnswer } from 'test/factories/make-answer'
import { OnAsnwerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository

describe('On answer created', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository,
    )
  })
  it('should be able a notification when an answer is created', async () => {
    const _onAnswerCreated = new OnAsnwerCreated()

    const answer = MakeAnswer()

    await inMemoryAnswersRepository.create(answer)
  })
})
