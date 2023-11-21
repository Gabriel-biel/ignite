import { OrderWithRecipient } from '@/domain/delivery-management/enterprise/entities/value-objects/order-with-recipient'

export class OrderWithRecipientPresenter {
  static toHTTP(orderWithRecipient: OrderWithRecipient) {
    return {
      orderId: orderWithRecipient.orderId.toString(),
      recipientId: orderWithRecipient.recipientId.toString(),
      cpf: orderWithRecipient.cpfRecipient,
      recipientName: orderWithRecipient.recipientName,
      recipientStreet: orderWithRecipient.recipientStreet,
      recipientHouseNumber: orderWithRecipient.recipientHouseNumber,
      createdAt: orderWithRecipient.createdAt,
      updatedAt: orderWithRecipient.updatedAt,
    }
  }
}
