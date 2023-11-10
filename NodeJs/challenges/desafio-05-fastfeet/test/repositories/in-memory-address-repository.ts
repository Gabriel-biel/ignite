import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { Address } from '@/domain/delivery-management/enterprise/entities/address'

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = []

  async create(address: Address) {
    this.items.push(address)
  }

  async findById(addressId: string) {
    const item = this.items.find((item) => item.id.toString() === addressId)

    if (!item) {
      return null
    }

    return item
  }

  async findByRecipientId(recipientId: string) {
    const items = this.items.filter(
      (item) => item.recipientId.toString() === recipientId,
    )

    return items
  }
}
