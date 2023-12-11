import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class AttachmentPresenter {
  static toHttp(attachment: Attachment) {
    return {
      attachmentId: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
