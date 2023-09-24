import { Optional } from '@/core/@types/optional'
import { Slug } from './Value-objects/Slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { QuestionAttachmentList } from './question-attachment-list'
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID | null
  attachments: QuestionAttachmentList
  title: string
  content: string
  slug: Slug
  created_at: Date
  updated_at?: Date | null
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined | null) {
    if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get updated_at() {
    return this.props.updated_at
  }

  get created_at() {
    return this.props.created_at
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get slug() {
    return this.props.slug
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  static create(
    props: Optional<QuestionProps, 'created_at' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        created_at: props.created_at ?? new Date(),
      },
      id,
    )
    return question
  }
}
