import { Either, rigth } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-respository'

export interface RegisterRecipientUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
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
    password,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      email,
      cpf,
      password,
    })

    await this.recipientRepository.create(recipient)

    return rigth({ recipient })
  }
}
