import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-coment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, left, rigth } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

export interface CommentOnAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

export type CommentOnAnswerResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerUseCase {
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
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId),
      content,
    })

    await this.answerCommentsRepostiory.create(answerComment)

    return rigth({
      answerComment,
    })
  }
}
