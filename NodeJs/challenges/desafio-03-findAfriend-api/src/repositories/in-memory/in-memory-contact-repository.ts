import { Prisma, Contact } from '@prisma/client'
import { ContactRepository } from '../contact-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryContactRepository implements ContactRepository {
  public items: Contact[] = []

  async create(data: Prisma.ContactUncheckedCreateInput) {
    const contact = {
      id: data.id ?? randomUUID(),
      phone: data.phone,
      address: data.address,
      org_id: data.org_id,
    }

    this.items.push(contact)
    return contact
  }

  async findById(id: string): Promise<Contact | null> {
    const contact = this.items.find((item) => item.id === id)

    if (!contact) {
      return null
    }

    return contact
  }
}
