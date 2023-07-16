import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { CommentOnAnswer } from './comment-on-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { MakeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepostiory: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswer

describe('Comment on answer use case', () => {
  beforeEach(() => {
    inMemoryAnswersRepostiory = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswer(
      inMemoryAnswersRepostiory,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = MakeAnswer()

    await inMemoryAnswersRepostiory.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comment in Answer',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comment in Answer',
    )
  })
})
