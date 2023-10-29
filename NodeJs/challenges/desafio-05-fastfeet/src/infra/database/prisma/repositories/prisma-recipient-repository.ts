import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { Recipient } from '@/domain/delivery-management/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaRecipientsRepository implements RecipientRepository {
  async create(recipient: Recipient) {
    throw new Error('Method not implemented.')
  }

  findById(recipientId: string): Promise<Recipient | null> {
    throw new Error('Method not implemented.')
  }

  findByCpf(cpf: string): Promise<Recipient | null> {
    throw new Error('Method not implemented.')
  }

  delete(recicipent: Recipient): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(recicipent: Recipient): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
