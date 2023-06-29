import { prisma } from '@/lib/prisma'
import { CreateOrg, OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: CreateOrg) {
    const org = await prisma.org.create({
      data: {
        id: data.id ?? randomUUID(),
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        role: data.role,
        Address: {
          create: {
            city: data.addresses?.city!,
            street: data.addresses?.street!,
            phone: data.addresses?.phone!,
          },
        },
      },
    })
    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
      include: {
        Address: {
          where: {
            org_id: id,
          },
        },
      },
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    })

    return org
  }

  async delete(id: string) {
    await prisma.org.delete({
      where: {
        id,
      },
    })
  }
}
