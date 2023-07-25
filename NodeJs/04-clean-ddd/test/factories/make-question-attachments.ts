import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function MakeQuestionAttachments(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const NewQuestionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return NewQuestionAttachment
}
