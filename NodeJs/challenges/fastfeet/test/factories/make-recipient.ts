import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/delivery-management/enterprise/entity/recipient'
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
      ...override,
    },
    id,
  )

  return recipient
}
