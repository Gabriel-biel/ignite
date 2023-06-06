import { AddressesRepository, IAddress } from '../addresses-repository'
import { randomUUID } from 'node:crypto'
import { DataBaseInMemory } from './database-in-memory'

export class InMemoryAddressRepository implements AddressesRepository {
  constructor(private inMemoryDatabase: DataBaseInMemory) {}

  async create(data: IAddress) {
    const address = {
      id: randomUUID(),
      phone: data.phone,
      street: data.street,
      city: data.city,
      org_id: data.org_id,
    }

    this.inMemoryDatabase.addresses.push(address)
    return address
  }

  async findById(id: string) {
    const address = this.inMemoryDatabase.addresses.find(
      (item) => item.id === id,
    )

    if (!address) {
      return null
    }

    return address
  }
}
