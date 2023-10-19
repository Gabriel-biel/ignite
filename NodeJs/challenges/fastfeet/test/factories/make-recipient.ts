import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/delivery-management/enterprise/entities/recipient'
import { faker } from '@faker-js/faker'

export function MakeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.phone.number(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return recipient
}
