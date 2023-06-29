import { AddressesRepository, CreatedAddress } from '../addresses-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: CreatedAddress) {
    const address = await prisma.address.create({
      data,
    })

    return address
  }

  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    })

    return address
  }
}
