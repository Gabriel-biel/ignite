import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { PickupOrderEvent } from '@/domain/delivery-management/enterprise/events/pickup-order-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnPickupOrder implements EventHandler {
  constructor(
    private recipientRepository: RecipientRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  // criar o subscribe
  setupSubscriptions(): void {
    DomainEvents.register(
      // bind para dizer que o this e uma referência dessa classe, e não uma referência da classe que a chamou
      this.sendPickupOrderNotification.bind(this),
      PickupOrderEvent.name,
    )
  }

  private async sendPickupOrderNotification({
    order,
    pickupOrder,
  }: PickupOrderEvent) {
    const recipient = await this.recipientRepository.findById(
      order.recipientId.toString(),
    )

    if (recipient) {
      await this.sendNotification.execute({
        recipientId: recipient.id.toString(),
        title: 'Your order was picked up',
        content: `Your order was picked up at the agency in ${pickupOrder}, thankyou!`,
      })
    }
  }
}
