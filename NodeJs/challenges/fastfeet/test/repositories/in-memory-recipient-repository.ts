import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { Recipient } from '@/domain/delivery-management/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  constructor(private addressRepository: AddressRepository) {}

  async create(recipient: Recipient) {
    this.items.push(recipient)

    if (recipient.address) {
      await this.addressRepository.create(recipient.address)
    }
  }

  async findById(recipientId: string) {
    const recipient = this.items.find(
      (item) => item.id.toString() === recipientId,
    )

    if (!recipient) {
      return null
    }

    return recipient
  }

  async findByCpf(cpf: string) {
    const recipient = this.items.find((item) => item.cpf === cpf)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async delete(recipient: Recipient) {
    const item = this.items.findIndex((item) => item.id === recipient.id)

    this.items.splice(item, 1)
  }

  async save(recipient: Recipient) {
    const item = this.items.findIndex((item) => item.id === recipient.id)

    this.items[item] = recipient
  }
}
