import { OrderDetails } from '@/domain/delivery-management/enterprise/entities/value-objects/order-details'

export class OrderDetailsPresenter {
  static toHTTP(orderDetails: OrderDetails) {
    return {
      orderId: orderDetails.orderId.toString(),
      recipientId: orderDetails.recipientId.toString(),
      bestAddressId: orderDetails.bestAddressId?.toString(),
      cpf: orderDetails.cpfRecipient,
      recipientName: orderDetails.recipientName,
      recipientStreet: orderDetails.recipientStreet,
      recipientHouseNumber: orderDetails.recipientHouseNumber,
      attachments: orderDetails.attachments,
      createdAt: orderDetails.createdAt,
      updatedAt: orderDetails.updatedAt,
    }
  }
}
