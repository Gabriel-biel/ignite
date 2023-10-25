import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Order,
  OrderProps,
} from '@/domain/delivery-management/enterprise/entities/order'

export function MakeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      addressId: new UniqueEntityID(),
      deliverymanId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return order
}
