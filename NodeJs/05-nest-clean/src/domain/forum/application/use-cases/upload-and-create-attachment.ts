import { Either, left, rigth } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentType } from './errors/invalid-attachment-type'
import { AttachmentsRepository } from '../repositories/attachments-repository'
import { Attachment } from '../../enterprise/entities/attachment'
import { Uploader } from '../storage/uploader'

export interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

export type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentType,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^image\/(jpeg|jpg|png)$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentType(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentRepository.create(attachment)

    return rigth({ attachment })
  }
}
