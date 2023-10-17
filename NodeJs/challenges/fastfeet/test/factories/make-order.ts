import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Order,
  OrderProps,
} from '@/domain/delivery-management/enterprise/entity/order'
import { faker } from '@faker-js/faker'

export function MakeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(),
      delivered_at: faker.date.past(),
      created_at: faker.date.past(),
      ...override,
    },
    id,
  )

  return order
}
