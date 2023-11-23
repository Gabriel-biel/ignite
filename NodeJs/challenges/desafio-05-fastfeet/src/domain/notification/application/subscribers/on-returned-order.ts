import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { ReturnedOrderEvent } from '@/domain/delivery-management/enterprise/events/returned-order-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnReturnedOrder implements EventHandler {
  constructor(
    private recipientRepository: RecipientRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendReturnedOrder.bind(this),
      ReturnedOrderEvent.name,
    )
  }

  private async sendReturnedOrder({
    order,
    returnedOrder,
  }: ReturnedOrderEvent) {
    const recipient = await this.recipientRepository.findById(
      order.recipientId.toString(),
    )

    if (recipient) {
      await this.sendNotification.execute({
        recipientId: recipient.id.toString(),
        title: 'You order has been returned, sorry.',
        content: `You order was returned in ${returnedOrder}`,
      })
    }
  }
}
