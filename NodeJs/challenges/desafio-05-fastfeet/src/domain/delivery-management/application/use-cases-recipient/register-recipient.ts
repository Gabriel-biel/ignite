import { Either, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-respository'
import { Injectable } from '@nestjs/common'

export interface RegisterRecipientUseCaseRequest {
  name: string
  email: string
  cpf: string
}

export type RegisterRecipientUseCaseResponse = Either<
  null,
  { recipient: Recipient }
>

@Injectable()
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

    return right({ recipient })
  }
}
