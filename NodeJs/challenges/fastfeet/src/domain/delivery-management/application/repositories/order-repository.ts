import { Order } from '../../enterprise/entity/order'

export interface OrderRepository {
  create(order: Order): Promise<void>
  findById(orderId: string): Promise<Order | null>
  delete(order: Order): Promise<void>
  save(order: Order): Promise<void>
}
