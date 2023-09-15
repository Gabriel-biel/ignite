import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteByManyAnswerId(answerId: string): Promise<void>
}