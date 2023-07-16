import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-coment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

export interface CommentOnAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

export interface CommentOnAnswerResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswer {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepostiory: AnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
    const answer = this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId),
      content,
    })

    await this.answerCommentsRepostiory.create(answerComment)

    return {
      answerComment,
    }
  }
}
