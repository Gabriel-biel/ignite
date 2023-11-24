import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'

export interface EditRecipientUseCaseRequest {
  recipientId: string
  name: string
  email: string
}

export type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class EditRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
    name,
    email,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name
    recipient.email = email

    await this.recipientRepository.save(recipient)

    return right({ recipient })
  }
}
