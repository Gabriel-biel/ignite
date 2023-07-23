import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentProps {
  answer: UniqueEntityID
  attachment: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get answer() {
    return this.props.answer
  }

  get attahcment() {
    return this.props.attachment
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}
