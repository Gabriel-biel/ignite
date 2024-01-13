import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-coment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, left, rigth } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

export interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

export type CommentOnQuestionResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question = this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })
    await this.questionCommentsRepository.create(questionComment)

    return rigth({
      questionComment,
    })
  }
}