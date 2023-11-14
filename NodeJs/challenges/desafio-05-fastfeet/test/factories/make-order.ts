import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Order,
  OrderProps,
} from '@/domain/delivery-management/enterprise/entities/order'

export function MakeOrder(
  props: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      addressId: new UniqueEntityID(),
      recipientId: new UniqueEntityID(),
      ...props,
    },
    id,
  )

  return order
}
