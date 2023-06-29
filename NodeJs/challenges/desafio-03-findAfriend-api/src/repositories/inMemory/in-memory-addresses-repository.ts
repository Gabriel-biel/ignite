import { randomUUID } from 'node:crypto'
import { AddressesRepository, CreatedAddress } from '../addresses-repository'
import { DatabaseInMemory } from './database-in-memory'

export class InMemoryAddressesRepositories implements AddressesRepository {
  constructor(private inMemoryDatabase: DatabaseInMemory) {}
  async create(data: CreatedAddress) {
    const address = {
      id: randomUUID(),
      city: data.city,
      street: data.street,
      phone: data.phone,
      org_id: data.org_id,
    }

    this.inMemoryDatabase.address.push(address)

    return address
  }

  async findById(id: string) {
    const address = this.inMemoryDatabase.address.find((item) => item.id === id)

    if (!address) {
      return null
    }

    return address
  }
}
