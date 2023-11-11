import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { Prisma, Order as PrismaOrder } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        recipientId: new UniqueEntityID(raw.recipientId),
        addressId: new UniqueEntityID(raw.addressId),
        deliverymanId: raw.deliverymanId
          ? new UniqueEntityID(raw.deliverymanId)
          : undefined,
        delivered_at: raw.deliveredAt,
        pickup_available_order: raw.pickupAvailableOrder,
        pickup_at: raw.pickupAt,
        returned_at: raw.returnedAt,
        created_at: raw.createdAt,
        updated_at: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      addressId: order.addressId.toString(),
      recipientId: order.recipientId.toString(),
      deliverymanId: order.deliverymanId?.toString() ?? undefined,
      pickupAvailableOrder: order.pickup_available_order,
      pickupAt: order.pickup_at,
      deliveredAt: order.delivered_at,
      returnedAt: order.returned_at,
      createdAt: order.created_at ?? new Date(),
    }
  }
}
