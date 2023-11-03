import { Order } from '@/domain/delivery-management/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      recipientId: order.recipientId.toString(),
      addressId: order.addressId.toString(),
    }
  }
}
