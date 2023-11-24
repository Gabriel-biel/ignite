import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Address,
  AddressProps,
} from '@/domain/delivery-management/enterprise/entities/address'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAddressMapper } from '@/infra/database/prisma/mappers/prisma-address-mapper'

export function MakeAddress(
  override: Partial<AddressProps> = {},
  id?: UniqueEntityID,
) {
  const address = Address.create(
    {
      city: faker.location.city(),
      street: faker.location.street(),
      recipientId: new UniqueEntityID(),
      house_number: faker.location.buildingNumber(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return address
}

@Injectable()
export class AddressFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAddress(data: Partial<AddressProps> = {}): Promise<Address> {
    const address = MakeAddress(data)

    await this.prisma.address.create({
      data: PrismaAddressMapper.toPrisma(address),
    })

    return address
  }
}
