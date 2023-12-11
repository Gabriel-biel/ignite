import { Comment } from '@/domain/forum/enterprise/entities/comment'

export class CommentsPresenter {
  static toHttp(comment: Comment<any>) {
    return {
      authorId: comment.toString(),
      content: comment.content,
      cretedAt: comment.created_at,
      updatedAt: comment.updated_at,
    }
  }
}
