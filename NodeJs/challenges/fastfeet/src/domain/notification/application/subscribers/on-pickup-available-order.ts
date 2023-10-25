import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { PickupAvailableOrderEvent } from '@/domain/delivery-management/enterprise/events/pickup-available-order-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnPickupAvailableOrder implements EventHandler {
  constructor(
    private recipientRepository: RecipientRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendPickupAvailableOrder.bind(this),
      PickupAvailableOrderEvent.name,
    )
  }

  private async sendPickupAvailableOrder({
    order,
    pickupAvailableOrder,
  }: PickupAvailableOrderEvent) {
    const recipient = await this.recipientRepository.findById(
      order.recipientId.toString(),
    )

    if (recipient) {
      await this.sendNotificationUseCase.execute({
        recipientId: recipient.id.toString(),
        title: 'You order is available for pickup',
        content: `You order is available for pickup at ${pickupAvailableOrder}`,
      })
    }
  }
}
