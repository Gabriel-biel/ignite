import { Either, left, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-respository'
import { Injectable } from '@nestjs/common'
import { AccountAlreadyExists } from '../errors/account-already-exists'

export interface RegisterRecipientUseCaseRequest {
  name: string
  email: string
  cpf: string
}

export type RegisterRecipientUseCaseResponse = Either<
  AccountAlreadyExists,
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
    const rescipientAlreadyExists =
      await this.recipientRepository.findByCpf(cpf)

    if (rescipientAlreadyExists) {
      return left(new AccountAlreadyExists(cpf))
    }

    const recipient = Recipient.create({
      name,
      email,
      cpf,
    })

    await this.recipientRepository.create(recipient)

    return right({ recipient })
  }
}
