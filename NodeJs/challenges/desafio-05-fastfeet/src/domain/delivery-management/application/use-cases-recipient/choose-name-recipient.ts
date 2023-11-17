import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

export interface ChooseNameRecipientUseCaseRequest {
  recipientId: string
  name: string
}

export type ChooseNameRecipientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class ChooseNameRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
    name,
  }: ChooseNameRecipientUseCaseRequest): Promise<ChooseNameRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name

    await this.recipientRepository.save(recipient)

    return right({ recipient })
  }
}
