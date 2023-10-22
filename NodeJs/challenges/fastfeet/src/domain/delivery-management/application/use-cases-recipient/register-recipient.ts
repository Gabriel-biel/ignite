import { Either, rigth } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-respository'
import { Address } from '../../enterprise/entities/address'

export interface RegisterRecipientUseCaseRequest {
  name: string
  email: string
  cpf: string
  address?: Address
}

export type RegisterRecipientUseCaseResponse = Either<
  null,
  { recipient: Recipient }
>

export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}
  async execute({
    name,
    email,
    cpf,
    address,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      email,
      cpf,
      address,
    })

    await this.recipientRepository.create(recipient)

    return rigth({ recipient })
  }
}
