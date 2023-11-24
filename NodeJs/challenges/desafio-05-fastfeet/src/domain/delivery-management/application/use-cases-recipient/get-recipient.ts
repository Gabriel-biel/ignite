import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-respository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

export interface GetRecipientUseCaseRequest {
  recipientId: string
}

export type GetRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class GetRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    recipientId,
  }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    return right({ recipient })
  }
}
