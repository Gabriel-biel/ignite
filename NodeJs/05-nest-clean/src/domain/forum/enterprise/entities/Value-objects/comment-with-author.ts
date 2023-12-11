import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface CommnetWithAuthorProps {
  authorId: UniqueEntityID
  commentId: UniqueEntityID
  content: string
  authorName: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<CommnetWithAuthorProps> {
  get authorId() {
    return this.props.authorId
  }

  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get authorName() {
    return this.props.authorName
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommnetWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}
