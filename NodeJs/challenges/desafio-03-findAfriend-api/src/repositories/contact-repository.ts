import { Contact, Prisma } from '@prisma/client'

export interface ContactRepository {
  create(data: Prisma.ContactUncheckedCreateInput): Promise<Contact>
  findById(id: string): Promise<Contact | null>
}
