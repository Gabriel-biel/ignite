import { Recipient } from '../../enterprise/entity/recipient'

export interface RecipientRepository {
  create(recipient: Recipient): Promise<void>
  findById(recipientId: string): Promise<Recipient | null>
  findByEmail(email: string): Promise<Recipient | null>
  delete(recicipent: Recipient): Promise<void>
  save(recicipent: Recipient): Promise<void>
}
