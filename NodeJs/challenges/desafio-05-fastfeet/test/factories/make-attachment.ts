import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/delivery-management/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-attachment-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function MakeAttachment(
  props: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const attachment = Attachment.create(
    {
      title: faker.commerce.productName(),
      link: faker.image.urlPlaceholder(),
      ...props,
    },
    id,
  )

  return attachment
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(data: Partial<AttachmentProps> = {}) {
    const attachment = MakeAttachment(data)

    await this.prisma.attachments.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    })

    return attachment
  }
}
