import { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import dayjs from 'dayjs'

interface AnswerProps {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  created_at: Date
  updated_at?: Date
}

export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get questionId() {
    return this.props.questionId
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }

  get isNew(): Boolean {
    return dayjs().diff(this.created_at, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return answer
  }
}
