import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { Order as PrismaOrder } from '@prisma/client'

// export class PrismaOrderMapper {
//   static toDomain(raw: PrismaOrder): Order {
//     return Order.create({
//       // recipientId: new UniqueEntityID(raw.recipientId),
//       // addressId: new UniqueEntityID(raw.),
//       // delivered_at: raw.deliveredAt,
//       // pickup_available_order: raw.pickupAvailableOrder,
//       // pickup_at: raw.pickupAt,
//       // returned_at: raw.returnedAt,
//       // created_at: raw.createdAt,
//       // updated_at: raw.updatedAt,
//     })
//   }
// }
