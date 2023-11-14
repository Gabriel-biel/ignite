import { Recipient } from '@/domain/delivery-management/enterprise/entities/recipient'

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      email: recipient.email,
      cpf: recipient.cpf,
      best_address: recipient.bestAddressId,
    }
  }
}
