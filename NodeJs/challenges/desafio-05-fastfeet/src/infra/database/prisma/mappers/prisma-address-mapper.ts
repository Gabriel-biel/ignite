import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from '@/domain/delivery-management/enterprise/entities/address'
import { Prisma, Address as PrismaAddress } from '@prisma/client'

export class PrismaAddressMapper {
  static toDomain(raw: PrismaAddress) {
    return Address.create({
      recipientId: new UniqueEntityID(raw.recipientId),
      city: raw.city,
      street: raw.street,
      house_number: raw.houseNumber,
      latitude: Number(raw.latitude),
      longitude: Number(raw.longitude),
    })
  }

  static toPrisma(address: Address): Prisma.AddressUncheckedCreateInput {
    return {
      id: address.id.toString(),
      recipientId: address.recipientId.toString(),
      city: address.city,
      street: address.street,
      houseNumber: address.house_number,
      latitude: address.latitude.toString(),
      longitude: address.longitude.toString(),
    }
  }
}
