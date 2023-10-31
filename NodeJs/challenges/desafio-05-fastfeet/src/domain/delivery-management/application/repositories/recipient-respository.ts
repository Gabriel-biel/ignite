import { Recipient } from '../../enterprise/entities/recipient'

export abstract class RecipientRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findById(recipientId: string): Promise<Recipient | null>
  abstract findByCpf(cpf: string): Promise<Recipient | null>
  abstract delete(recicipent: Recipient): Promise<void>
  abstract save(recicipent: Recipient): Promise<void>
}
