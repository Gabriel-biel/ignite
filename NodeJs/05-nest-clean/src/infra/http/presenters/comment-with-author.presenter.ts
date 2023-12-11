import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/Value-objects/comment-with-author'

export class CommentsWithAuthorPresenter {
  static toHttp(commentWithAuthor: CommentWithAuthor) {
    return {
      authorId: commentWithAuthor.toString(),
      commentId: commentWithAuthor.commentId.toString(),
      authorName: commentWithAuthor.authorName,
      content: commentWithAuthor.content,
      cretedAt: commentWithAuthor.createdAt,
      updatedAt: commentWithAuthor.updatedAt,
    }
  }
}
