import { randomUUID } from 'node:crypto'
import { CreateOrg, OrgsRepository } from '../orgs-repository'
import { DatabaseInMemory } from './database-in-memory'

export class InMemoryOrgsRepository implements OrgsRepository {
  constructor(private inMemoryDatabase: DatabaseInMemory) {}
  async create(data: CreateOrg) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'Member',
      created_at: data.created_at ?? new Date(),
    }

    if (data.addresses) {
      const address = {
        id: randomUUID(),
        city: data.addresses.city,
        street: data.addresses.street,
        phone: data.addresses.phone,
        org_id: org.id,
      }

      this.inMemoryDatabase.address.push(address)
    }

    this.inMemoryDatabase.orgs.push(org)

    return org
  }

  async findById(id: string) {
    const org = this.inMemoryDatabase.orgs.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.inMemoryDatabase.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async delete(id: string) {
    this.inMemoryDatabase.orgs = this.inMemoryDatabase.orgs.filter(
      (org) => org.id !== id,
    )
    this.inMemoryDatabase.address = this.inMemoryDatabase.address.filter(
      (address) => address.org_id !== id,
    )
  }
}
