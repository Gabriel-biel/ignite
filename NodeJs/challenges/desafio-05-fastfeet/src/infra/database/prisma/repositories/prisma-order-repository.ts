import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyParams,
  OrderRepository,
} from '@/domain/delivery-management/application/repositories/order-repository'
import { Order } from '@/domain/delivery-management/enterprise/entities/order'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaOrdersRepository implements OrderRepository {
  async create(order: Order) {
    throw new Error('Method not implemented.')
  }

  findById(orderId: string): Promise<Order | null> {
    throw new Error('Method not implemented.')
  }

  findManyByOrdersRecipient(
    page: PaginationParams,
    recipientId: string,
  ): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }

  findManyByOrdersAccount(
    page: PaginationParams,
    accountId: string,
  ): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }

  findManyNearby(params: FindManyNearbyParams): Promise<Order[]> {
    throw new Error('Method not implemented.')
  }

  delete(order: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(order: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
