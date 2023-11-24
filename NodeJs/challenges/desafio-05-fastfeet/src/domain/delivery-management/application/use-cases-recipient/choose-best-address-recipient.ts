import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { AddressRepository } from '../repositories/address-repository'
import { Injectable } from '@nestjs/common'

export interface ChooseBestAddressRecipientUseCaseRequest {
  recipientId: string
  addressId: string
}

export type ChooseBestAddressRecipientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class ChooseBestAddressRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private addressRepository: AddressRepository,
  ) {}

  async execute({
    recipientId,
    addressId,
  }: ChooseBestAddressRecipientUseCaseRequest): Promise<ChooseBestAddressRecipientUseCaseResponse> {
    const address = await this.addressRepository.findById(addressId)

    if (!address) {
      return left(new ResourceNotFoundError())
    }

    const recipient = await this.recipientRepository.findById(
      address.recipientId.toString(),
    )

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== recipient.id.toString()) {
      return left(new NotAllowedError())
    }

    recipient.bestAddressId = address.id

    await this.recipientRepository.save(recipient)

    return right({ recipient })
  }
}
