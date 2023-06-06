import { IOrg, OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'
import { DataBaseInMemory } from './database-in-memory'

export class InMemoryOrgsRepository implements OrgsRepository {
  constructor(private inMemoryDatabase: DataBaseInMemory) {}

  async create(data: IOrg) {
    const org = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'MEMBER',
    }

    if (data.addresses) {
      const address = {
        id: randomUUID(),
        org_id: org.id,
        city: data.addresses.city,
        street: data.addresses.street,
        phone: data.addresses.phone,
      }
      this.inMemoryDatabase.addresses.push(address)
    }

    this.inMemoryDatabase.orgs.push(org)
    return org
  }

  async findById(id: string) {
    const org = this.inMemoryDatabase.orgs.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.inMemoryDatabase.orgs.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async searchMany(query: string, page: number) {
    return this.inMemoryDatabase.orgs
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
