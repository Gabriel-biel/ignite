import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { Address } from '@/domain/delivery-management/enterprise/entities/address'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper'

@Injectable()
export class PrismaAddressesRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(address: Address) {
    const data = PrismaAddressMapper.toPrisma(address)

    await this.prisma.address.create({
      data,
    })
  }

  async findById(addressId: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        id: addressId,
      },
    })

    if (!address) {
      return null
    }

    return PrismaAddressMapper.toDomain(address)
  }

  async findByRecipientId(recipientId: string) {
    const adresses = await this.prisma.address.findMany({
      where: {
        recipientId,
      },
    })

    // const addresses = items.map((item) => PrismaAddressMapper.toDomain(item))
    return adresses.map((item) => PrismaAddressMapper.toDomain(item))
  }
}
