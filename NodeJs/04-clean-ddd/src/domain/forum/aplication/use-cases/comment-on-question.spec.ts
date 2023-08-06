import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository'
import { CommentOnQuestion } from './comment-on-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { MakeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestion

describe('Comment on question test use case', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestion(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário test',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Comentário test',
    )
  })
})
