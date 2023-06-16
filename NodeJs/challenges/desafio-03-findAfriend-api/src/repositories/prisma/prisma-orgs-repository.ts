import { IOrg, OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: IOrg) {
    const org = await prisma.org.create({
      data: {
        title: data.title,
        email: data.email,
        password_hash: data.password_hash,
        description: data.description,
        addresses: {
          create: {
            city: data.addresses?.city!,
            phone: data.addresses?.phone!,
            street: data.addresses?.street!,
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
        addresses: true,
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

  async searchMany(query: string, page: number) {
    const orgs = await prisma.org.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return orgs
  }
}
