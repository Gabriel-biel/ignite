import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyParams,
  OrderRepository,
} from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { PrismaService } from '../prisma.service'
import { Address } from '@prisma/client'
import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'

@Injectable()
export class PrismaOrdersRepository implements OrderRepository {
  constructor(
    private prisma: PrismaService,
    private orderAttachments: OrderAttachmentsRepository,
  ) {}

  async create(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)
    await this.prisma.order.create({ data })

    if (order.attachments) {
      await this.orderAttachments.createMany(order.attachments.getItems())
    }
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

    const orders = items.map(PrismaOrderMapper.toDomain)

    return orders
  }

  async findManyByOrdersDeliveryman(
    { page }: PaginationParams,
    deliverymanId: string,
  ) {
    const ordersPerPage = 10

    const items = await this.prisma.order.findMany({
      where: {
        deliverymanId,
      },
      take: ordersPerPage,
      skip: (page - 1) * ordersPerPage,
    })

    return items.map(PrismaOrderMapper.toDomain)
  }

  async findManyNearby({
    deliverymanId,
    latitude,
    longitude,
  }: FindManyNearbyParams) {
    const orders = await this.prisma.order.findMany({
      where: {
        deliverymanId,
        deliveredAt: undefined,
        returnedAt: undefined,
      },
    })

    const addresses = await this.prisma.$queryRaw<Address[]>`
        SELECT * from addresses
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 1`

    const ordersNearby = orders.filter((order) =>
      addresses.some((address) => order.addressId === address.id),
    )

    return ordersNearby.map(PrismaOrderMapper.toDomain)
  }

  async delete(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)
    await this.prisma.order.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(order: Order) {
    const data = PrismaOrderMapper.toPrisma(order)

    if (order.attachments) {
      await Promise.all([
        this.prisma.order.update({
          where: {
            id: data.id,
          },
          data,
        }),
        this.orderAttachments.createMany(order.attachments.getNewItems()),
        this.orderAttachments.deleteMany(order.attachments.getRemovedItems()),
      ])
    }

    await this.prisma.order.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
