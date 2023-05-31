import { Address } from '@prisma/client'
import {
  AddressCreateInput,
  AddressesRepository,
} from '../addresses-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressRepository implements AddressesRepository {
  public items: Address[] = []

  async create(data: AddressCreateInput) {
    const address = {
      id: randomUUID(),
      phone: data.phone,
      street: data.street,
      city: data.city,
      org_id: data.org_id,
    }

    this.items.push(address)
    return address
  }

  async findById(id: string) {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      return null
    }

    return address
  }
}
