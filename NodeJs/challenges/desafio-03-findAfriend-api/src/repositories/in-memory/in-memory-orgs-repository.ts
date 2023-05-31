import { OrgCreateInput, OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'
import { Org } from '@prisma/client'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ?? 'MEMBER',
      addresses: data.addresses,
    }

    this.items.push(org)
    return org
  }
}
