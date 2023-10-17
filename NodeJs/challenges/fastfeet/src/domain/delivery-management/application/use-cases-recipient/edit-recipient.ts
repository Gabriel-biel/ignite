import { Either, left, rigth } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entity/recipient'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

export interface EditRecipientUseCaseRequest {
  recipientId: string
  name: string
  email: string
}

export type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    recipient: Recipient
  }
>

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

    return rigth({ recipient })
  }
}
