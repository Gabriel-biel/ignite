import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AttachmentsRepository } from '@/domain/delivery-management/application/repositories/attachments-repository'
import { Attachment } from '@/domain/delivery-management/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment) {
    const data = PrismaAttachmentMapper.toPrisma(attachment)
    await this.prisma.attachments.create({
      data,
    })
  }
}
