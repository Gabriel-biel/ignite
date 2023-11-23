import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { DeliveredOrderEvent } from '@/domain/delivery-management/enterprise/events/delivered-order-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnDeliveredOrder implements EventHandler {
  constructor(
    private recipientRepository: RecipientRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendDeliveredOrderNotification.bind(this),
      DeliveredOrderEvent.name,
    )
  }

  private async sendDeliveredOrderNotification({
    deliveredOrder,
    order,
  }: DeliveredOrderEvent) {
    const recipient = await this.recipientRepository.findById(
      order.recipientId.toString(),
    )

    if (recipient) {
      await this.sendNotification.execute({
        recipientId: recipient.id.toString(),
        content: `You order was delivered to ${deliveredOrder}`,
        title: 'You order has been delivered!',
      })
    }
  }
}
