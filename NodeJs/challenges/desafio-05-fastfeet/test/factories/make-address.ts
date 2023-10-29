import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Address,
  AddressProps,
} from '@/domain/delivery-management/enterprise/entities/address'

export function MakeAddress(
  override: Partial<AddressProps> = {},
  id?: UniqueEntityID,
) {
  const address = Address.create(
    {
      city: faker.location.city(),
      street: faker.location.street(),
      recipientId: new UniqueEntityID(),
      house_number: Number(faker.location.buildingNumber()),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return address
}
