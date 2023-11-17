import { AttachmentsRepository } from '@/domain/delivery-management/application/repositories/attachments-repository'
import { Attachment } from '@/domain/delivery-management/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachments: Attachment) {
    this.items.push(attachments)
  }
}
