import { Order } from '@/domain/delivery-management/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      recipientId: order.recipientId.toString(),
      addressId: order.addressId.toString(),
      deliverymanId: order.deliverymanId?.toString(),
      pickup_available_order: order.pickup_available_order,
      pickup_at: order.pickup_at,
      delivered_at: order.delivered_at,
      attachments: order.attachments,
      created_at: order.created_at,
      updated_at: order.updated_at,
    }
  }
}
