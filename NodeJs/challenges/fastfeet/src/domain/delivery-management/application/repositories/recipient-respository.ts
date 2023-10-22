import { Recipient } from '../../enterprise/entities/recipient'

export interface RecipientRepository {
  create(recipient: Recipient): Promise<void>
  findById(recipientId: string): Promise<Recipient | null>
  findByCpf(cpf: string): Promise<Recipient | null>
  delete(recicipent: Recipient): Promise<void>
  save(recicipent: Recipient): Promise<void>
}
