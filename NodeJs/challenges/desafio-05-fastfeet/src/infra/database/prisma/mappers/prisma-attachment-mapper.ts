import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/delivery-management/enterprise/entities/attachment'
import { Attachments as PrismaAttachment, Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        link: raw.link,
        title: raw.title,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentsUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      link: attachment.link,
      title: attachment.title,
    }
  }
}
