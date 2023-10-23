import { Either, rigth } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-respository'

export interface RegisterRecipientUseCaseRequest {
  name: string
  email: string
  cpf: string
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
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      email,
      cpf,
    })

    await this.recipientRepository.create(recipient)

    return rigth({ recipient })
  }
}
