import { Prisma, Contact } from '@prisma/client'
import { ContactRepository } from '../contact-repository'
import { prisma } from '@/lib/prisma'

export class PrismaContactRepository implements ContactRepository {
  async create(data: Prisma.ContactUncheckedCreateInput) {
    const contact = await prisma.contact.create({
      data,
    })

    return contact
  }

  async findById(id: string): Promise<Contact | null> {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    })

    return contact
  }
}
