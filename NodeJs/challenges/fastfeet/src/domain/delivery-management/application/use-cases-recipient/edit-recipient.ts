import { Either, left, rigth } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Address } from '../../enterprise/entities/address'

export interface EditRecipientUseCaseRequest {
  recipientId: string
  name: string
  email: string
  address: Address
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
    address,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name
    recipient.email = email
    recipient.address = address

    await this.recipientRepository.save(recipient)

    return rigth({ recipient })
  }
}
