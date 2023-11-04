import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyParams,
  OrderRepository,
} from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOrdersRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)
    await this.prisma.order.create({ data })
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async findManyByOrdersRecipient(
    { page }: PaginationParams,
    recipientId: string,
  ) {
    const items = await this.prisma.order.findMany({
      where: {
        recipientId,
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    const orders = items.map((item) => PrismaOrderMapper.toDomain(item))

    return orders
  }

  async findManyByOrdersAccount({ page }: PaginationParams, accountId: string) {
    const items = await this.prisma.order.findMany({
      where: {
        recipientId: accountId,
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    const orders = items.map((item) => PrismaOrderMapper.toDomain(item))

    return orders
  }

  async findManyNearby({
    deliverymanId,
    latitude,
    longitude,
  }: FindManyNearbyParams) {
    const items = await this.prisma.$queryRaw<Order[]>`
      SELECT * from orders
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 1
    `

    const orders = items.filter(
      (item) => item.deliverymanId?.toString() === deliverymanId,
    )

    return orders
  }

  async delete(order: Order) {
    const item = PrismaOrderMapper.toPrisma(order)
    await this.prisma.order.delete({
      where: {
        id: item.id,
      },
    })
  }

  async save(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)
    await this.prisma.order.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
