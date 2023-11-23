import { OnDeliveredOrder } from '@/domain/notification/application/subscribers/on-delivered-order-events'
import { OnPickupAvailableOrder } from '@/domain/notification/application/subscribers/on-pickup-available-order'
import { OnPickupOrder } from '@/domain/notification/application/subscribers/on-pickup-order'
import { OnReturnedOrder } from '@/domain/notification/application/subscribers/on-returned-order'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnDeliveredOrder,
    OnReturnedOrder,
    OnPickupOrder,
    OnPickupAvailableOrder,
    SendNotificationUseCase,
  ],
})
export class EnventsModule {}
